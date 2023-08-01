#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jan 11 10:46:51 2023

@author: rj102145
"""

import warnings

import numpy as np
import scipy.fftpack as fftpack
import scipy.signal as signal
import torch

eps = 1e-12


def torch_leq(waveform, sample_rate, dt=0.125, ref=1):
    """
    computes the Leq Tensor from a torch Tensor such as given by torchaudio.load
    waveform, sample_rate = torchaudio.load(file_path)

    Parameters
    ----------
    waveform : torchTensor[nb_channels, nb_samples_per_channels]
        raw wav samples
    sample_rate : int
        sample rate in Hz
    dt : float
        integration time for the Leq values in seconds

    Returns
    -------
    Leq torch.Tensor[nb_channels, nb_Leq _values]

    """
    dn = int(dt * sample_rate)
    n_ch, l_sig = waveform.shape
    n_leq = l_sig // dn
    if n_leq >= 1:
        waveform = waveform[:, : n_leq * dn]
        waveform = waveform.reshape([n_ch, n_leq, dn])
        short_time_leq = 10 * torch.log10(
            torch.nanmean(waveform**2, -1) / (ref**2) + eps
        )
    else:
        warnings.warn("Too few wav samples according to the Leq integration time")
        short_time_leq = torch.empty([n_ch, n_leq])
    return short_time_leq


def numpy_leq(
    waveform,
    sample_rate,
    dt=0.125,
    ref=1,
    freq_lim=[],  # INFO: This argument is mutable.
):
    """
    computes the Leq np.array from a np.array such as given by
    scipy.io.wavfile.read
    import scipy.io.wavfile as wavfile
    sample_rate, waveform = wavfile.read(file_path)

    Parameters
    ----------
    waveform : np.array[nb_samples_per_channels, nb_channels]
        raw wav samples
    sample_rate : int
        sample rate in Hz
    dt : float
        integration time for the Leq values in seconds

    Returns
    -------
    Leq np.array[nb_channels, nb_Leq _values]

    """
    if len(freq_lim) == 2:
        if freq_lim[0] > 0:
            ph_filtre = signal.butter(
                5, freq_lim[0], btype="highpass", output="sos", fs=sample_rate
            )
            waveform = signal.sosfiltfilt(
                ph_filtre, waveform, axis=-1, padtype="odd", padlen=None
            )
        if freq_lim[1] < sample_rate:
            pb_filtre = signal.butter(
                5, freq_lim[1], btype="lowpass", output="sos", fs=sample_rate
            )
            waveform = signal.sosfiltfilt(
                pb_filtre, waveform, axis=-1, padtype="odd", padlen=None
            )

    dn = int(dt * sample_rate)
    if len(waveform.shape) == 1:
        waveform = np.reshape(waveform, (len(waveform), 1))
    l_sig, n_ch = waveform.shape
    n_leq = l_sig // dn
    if n_leq >= 1:
        waveform = waveform[: n_leq * dn, :]
        waveform = waveform.reshape([n_leq, dn, n_ch])
        short_time_leq = 10 * np.log10(np.nanmean(waveform**2, 1) / (ref**2) + eps)
    else:
        warnings.warn("Too few wav samples according to the Leq integration time")
        short_time_leq = np.empty((0,) * 2)
    return short_time_leq


def energy_fract_from_spect(waveform, sample_rate, dt=1.0):
    """
    Parameters
    ----------
    waveform : np.array[nb_samples_per_channels, nb_channels]
        raw wav samples
    sample_rate : int
        sample rate in Hz
    dt : float
        integration time for the fourier mean transform

    Returns
    -------
    cumFourier : np.array[nb_of_frequency, nb_channels]
        the cumulative sum of the mean spectrum power over the frequency axis
    freq : np.array[nb_of_frequency]
        the corresponding frequency values

    """
    dnfft = int(dt * sample_rate)
    if len(waveform.shape) == 1:
        waveform = np.reshape(waveform, (len(waveform), 1))
    l_sig, n_ch = waveform.shape
    # number of zeros to pad
    if l_sig % dnfft == 0:
        n_pad = 0
    else:
        n_pad = dnfft - l_sig % dnfft
    # 'padding' coefficient
    alpha = dnfft / (dnfft - n_pad)
    # zero padding
    waveform = np.vstack((waveform, np.zeros((n_pad, n_ch))))
    nb_fft = waveform.shape[0] // dnfft
    waveform = waveform.reshape([dnfft, int(nb_fft), n_ch])
    fourierform = fftpack.fft(waveform, n=sample_rate, axis=0)
    # not considering the 0 Hz and (obviously) only the positives frequencies
    # energy per frequency steps
    # import matplotlib.pyplot as plt
    # plt.plot(10*np.log10(np.abs(fourierform)**2))
    fourierform = fourierform[1 : int(np.ceil((dnfft) / 2)), :, :]
    fourierform = np.abs(fourierform) ** 2
    fourierform = fourierform * alpha
    fourierform = np.nansum(fourierform, axis=1)
    # frequency steps
    freq = fftpack.fftfreq(dnfft, d=1 / sample_rate)
    freq = freq[1 : int(np.ceil((dnfft) / 2))]
    # cumulative energie per frequency steps
    cum_fourier = np.cumsum(fourierform, axis=0)

    return fourierform, cum_fourier, np.array(freq)


def statistical_leq(short_time_leq, stat=None):
    if stat == None:
        leq_stat = 10 * np.log10(np.mean(10 ** (short_time_leq / 10)))
    else:
        leq_stat = np.quantile(short_time_leq, 1 - stat / 100)
    return leq_stat


def statistical_power_spectrum(
    cum_fourier,
    freq,
    stat,
    channel=0,
    freq_lim=[],  # INFO: This argument is mutable.
):
    cum_fourier2 = cum_fourier[:, channel]
    if len(freq_lim) == 2:
        cum_fourier2 = cum_fourier2[(freq >= freq_lim[0]) * (freq <= freq_lim[1])]
        freq = freq[(freq >= freq_lim[0]) * (freq <= freq_lim[1])]
    spect_stat = cum_fourier2[-1] * (stat / 100)
    freq_stat = float(freq[cum_fourier2 <= spect_stat][-1])
    return freq_stat


def energy_ratio(fourierform, freq, freq_lim, channel=0, ratio_level=0.5):
    fourierform = fourierform[:, channel]
    center_freq = (freq_lim[1] - freq_lim[0]) * ratio_level + freq_lim[0]
    fourier_form_a = fourierform[(freq >= freq_lim[0]) * (freq <= center_freq)]
    fourier_form_b = fourierform[(freq >= center_freq) * (freq <= freq_lim[1])]
    nrj_ratio = 10 * np.log10(np.mean(fourier_form_a)) - 10 * np.log10(
        np.mean(fourier_form_b)
    )
    return nrj_ratio
