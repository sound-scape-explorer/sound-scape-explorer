#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jan 11 10:46:51 2023

@author: rj102145
"""

import torch
import numpy as np
import scipy.fftpack as fftpack
import scipy.signal as signal
import warnings
eps=1e-12

def torch_Leq(waveform, sample_rate, dt = 0.125, ref = 1):
    '''
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

    '''
    dn = int(dt*sample_rate)
    n_ch, l_sig = waveform.shape
    n_Leq = l_sig // dn
    if n_Leq >= 1:
        waveform = waveform[:,:n_Leq*dn]
        waveform = waveform.reshape([n_ch, n_Leq, dn])
        shortTime_Leq = 10*torch.log10( torch.nanmean(waveform**2, -1)/(ref**2) + eps)
    else:
        warnings.warn("Too few wav samples according to the Leq integration time")
        shortTime_Leq = torch.empty([n_ch, n_Leq])
    return shortTime_Leq
        
           
def numpy_Leq(waveform, sample_rate, dt = 0.125, ref = 1, freqLim=[]):
    '''
    computes the Leq np.array from a np.array such as given by scipy.io.wavfile.read
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

    '''
    if len(freqLim) == 2:
        if freqLim[0] > 0:
            PHFiltre = signal.butter(5, freqLim[0], btype='highpass', output='sos', fs=sample_rate)
            waveform = signal.sosfiltfilt(PHFiltre, waveform, axis=-1, padtype='odd', padlen=None)      
        if freqLim[1] < sample_rate:
            PBFiltre = signal.butter(5, freqLim[1], btype='lowpass', output='sos', fs=sample_rate)
            waveform = signal.sosfiltfilt(PBFiltre, waveform, axis=-1, padtype='odd', padlen=None)   
    
    dn = int(dt*sample_rate)
    if len(waveform.shape) == 1:
        waveform = np.reshape(waveform, (len(waveform),1))
    l_sig, n_ch = waveform.shape
    n_Leq = l_sig // dn
    if n_Leq >= 1:
        waveform = waveform[:n_Leq*dn,:]
        waveform = waveform.reshape([n_Leq, dn, n_ch])
        shortTime_Leq = 10*np.log10( np.nanmean(waveform**2, 1)/(ref**2) + eps)
    else:
        warnings.warn("Too few wav samples according to the Leq integration time")
        shortTime_Leq = np.empty((0,)*2)
    return shortTime_Leq

def energyFractFromSpect(waveform, sample_rate, dt=1.):
    '''
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

    '''
    dnfft = int(dt*sample_rate)
    if len(waveform.shape) == 1:
        waveform = np.reshape(waveform, (len(waveform),1))
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
    fourierform = fourierform[1:int(np.ceil((dnfft)/2)),:,:]
    fourierform = np.abs(fourierform)**2
    fourierform = fourierform * alpha
    fourierform = np.nansum(fourierform, axis=1)
    # frequency steps
    freq = fftpack.fftfreq(dnfft, d=1/sample_rate)
    freq = freq[1:int(np.ceil((dnfft)/2))]
    # cumulative energie per frequency steps
    cumFourier = np.cumsum(fourierform,axis=0)
    
    return fourierform, cumFourier, np.array(freq)

def statisticalLeq(shortTime_Leq, stat=None):
    if stat == None:
        Leq_stat = 10*np.log10(np.mean(10**(shortTime_Leq/10)))
    else:
        Leq_stat = np.quantile(shortTime_Leq, 1-stat/100)
    return Leq_stat

def statisticalPowerSpectrum(cumFourier, freq, stat, channel = 0, freqLim = []):
    cumFourier2 = cumFourier[:,channel]
    if len(freqLim) == 2:
        cumFourier2 = cumFourier2[(freq>=freqLim[0]) * (freq<=freqLim[1])]
        freq = freq[(freq>=freqLim[0]) * (freq<=freqLim[1])]
    Spect_stat = cumFourier2[-1] * (stat/100)
    freq_stat = float(freq[cumFourier2<=Spect_stat][-1])
    return freq_stat

def energyRatio(fourierform, freq, freqLim, channel = 0, ratioLevel = 0.5):
    fourierform = fourierform[:,channel]
    centerFreq = (freqLim[1]-freqLim[0]) * ratioLevel + freqLim[0]
    fourierformA =  fourierform[(freq>=freqLim[0]) * (freq<=centerFreq)]
    fourierformB =  fourierform[(freq>=centerFreq) * (freq<=freqLim[1])]
    nrjRatio = 10*np.log10(np.mean(fourierformA)) - 10*np.log10(np.mean(fourierformB)) 
    return nrjRatio
    


    
    