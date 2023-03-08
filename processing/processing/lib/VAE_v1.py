#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Feb  1 18:22:30 2023

@author: rj102145
"""

import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
from sklearn import preprocessing
from torch import optim
from torch.autograd import Variable
from torch.utils.data import DataLoader, Dataset

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


def load_data(X):
    df = pd.DataFrame(X)
    # replace nan with -99
    df = df.fillna(-99)
    x = df.values.reshape(-1, df.shape[1]).astype('float32')
    # stadardize values
    standardizer = preprocessing.StandardScaler()
    x = standardizer.fit_transform(x)
    return x, standardizer


def numpyToTensor(x):
    x_train = torch.from_numpy(x).to(device)
    return x_train


class DataBuilder(Dataset):
    def __init__(self, X):
        self.x, self.standardizer = load_data(X)
        self.x = numpyToTensor(self.x)
        self.len = self.x.shape[0]

    def __getitem__(self, index):
        return self.x[index]

    def __len__(self):
        return self.len


class Autoencoder(nn.Module):
    def __init__(self, D_in, H=[64, 32], latent_dim=2):

        # Encoder
        super(Autoencoder, self).__init__()
        # input layer
        self.linear1 = nn.Linear(D_in, H[0])
        self.lin_bn1 = nn.BatchNorm1d(num_features=H[0])

        # hidden layers
        self.HiddenLayersIn = []
        for i in range(len(H) - 1):
            self.linear2 = nn.Linear(H[i], H[i + 1]).to(device)
            self.lin_bn2 = nn.BatchNorm1d(num_features=H[i + 1]).to(device)
            self.HiddenLayersIn.append([self.linear2, self.lin_bn2])

        self.linear3 = nn.Linear(H[-1], H[-1])
        self.lin_bn3 = nn.BatchNorm1d(num_features=H[-1])

        #         # Latent vectors mu and sigma
        self.fc1 = nn.Linear(H[-1], latent_dim)
        self.bn1 = nn.BatchNorm1d(num_features=latent_dim)
        self.fc21 = nn.Linear(latent_dim, latent_dim)
        self.fc22 = nn.Linear(latent_dim, latent_dim)

        #         # Sampling vector
        self.fc3 = nn.Linear(latent_dim, latent_dim)
        self.fc_bn3 = nn.BatchNorm1d(latent_dim)
        self.fc4 = nn.Linear(latent_dim, H[-1])
        self.fc_bn4 = nn.BatchNorm1d(H[-1])

        #         # Decoder
        self.linear4 = nn.Linear(H[-1], H[-1])
        self.lin_bn4 = nn.BatchNorm1d(num_features=H[-1])

        self.HiddenLayersOut = []
        for i in range(len(H) - 1, 0, -1):
            self.linear5 = nn.Linear(H[i], H[i - 1]).to(device)
            self.lin_bn5 = nn.BatchNorm1d(num_features=H[i - 1]).to(device)
            self.HiddenLayersOut.append([self.linear5, self.lin_bn5])

        # output layer
        self.linear6 = nn.Linear(H[0], D_in)
        self.lin_bn6 = nn.BatchNorm1d(num_features=D_in)

        self.relu = nn.ReLU()

    def encode(self, x):
        lin1 = self.relu(self.lin_bn1(self.linear1(x)))
        linLast = lin1
        for i in range(len(self.HiddenLayersIn)):
            linLast = self.relu(
                self.HiddenLayersIn[i][1] \
                    (self.HiddenLayersIn[i][0](linLast))
            )
        lin3 = self.relu(self.lin_bn3(self.linear3(linLast)))

        fc1 = F.relu(self.bn1(self.fc1(lin3)))
        r1 = self.fc21(fc1)
        r2 = self.fc22(fc1)

        return r1, r2

    def reparameterize(self, mu, logvar):
        if self.training:
            std = logvar.mul(0.5).exp_()
            eps = Variable(std.data.new(std.size()).normal_())
            return eps.mul(std).add_(mu)
        else:
            return mu

    def decode(self, z):
        fc3 = self.relu(self.fc_bn3(self.fc3(z)))

        fc4 = self.relu(self.fc_bn4(self.fc4(fc3)))
        lin4 = self.relu(self.lin_bn4(self.linear4(fc4)))
        linLast = lin4
        for i in range(len(self.HiddenLayersOut)):
            linLast = self.relu(
                self.HiddenLayersOut[i][1] \
                    (self.HiddenLayersOut[i][0](linLast))
            )
        return self.lin_bn6(self.linear6(linLast))

    def forward(self, x):
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        return self.decode(z), mu, logvar


class customLoss(nn.Module):
    def __init__(self):
        super(customLoss, self).__init__()
        self.mse_loss = nn.MSELoss(reduction="sum")

    def forward(self, x_recon, x, mu, logvar):
        loss_MSE = self.mse_loss(x_recon, x)
        loss_KLD = -0.5 * torch.sum(1 + logvar - mu.pow(2) - logvar.exp())

        return loss_MSE + loss_KLD


def weights_init_uniform_rule(m):
    # TODO : but why a uniform init? why not a random one with a fixed seed
    classname = m.__class__.__name__
    # for every Linear layer in a model..
    if classname.find('Linear') != -1:
        # get the number of the inputs
        n = m.in_features
        y = 1.0 / np.sqrt(n)
        m.weight.data.uniform_(-y, y)
        m.bias.data.fill_(0)


def train(epoch, trainloader, model, optimizer, loss_mse):
    model.train()
    train_loss = 0
    train_losses = []
    for batch_idx, data in enumerate(trainloader):
        data = data.to(device)
        optimizer.zero_grad()
        recon_batch, mu, logvar = model(data)
        loss = loss_mse(recon_batch, data, mu, logvar)
        loss.backward()
        train_loss += loss.item()
        optimizer.step()
    #        if batch_idx % log_interval == 0:
    #            print('Train Epoch: {} [{}/{} ({:.0f}%)]\tLoss: {:.6f}'.format(
    #                epoch, batch_idx * len(data), len(trainloader.dataset),
    #                       100. * batch_idx / len(trainloader),
    #                       loss.item() / len(data)))
    if epoch % 200 == 0:
        print(
            '====> Epoch: {} Average loss: {:.4f}'.format(
                epoch, train_loss / len(trainloader.dataset)
            )
        )
        train_losses.append(train_loss / len(trainloader.dataset))
    return model, train_losses


# %%
# training
class VAE():
    def __init__(
        self, n_components=None,
        HiddenLayers_dim=[64, 32],
        lr=1e-3,
        epochs=1500
    ):
        self.n_components = n_components
        self.HiddenLayers_dim = HiddenLayers_dim
        self.lr = lr
        self.epochs = epochs

    def fit(self, X, y=None):
        data_set = DataBuilder(X)
        self.trainloader = DataLoader(dataset=data_set, batch_size=32)
        self.D_in = data_set.x.shape[1]
        if self.n_components == None:
            self.D_out = self.D_in
        else:
            self.D_out = self.n_components

        self.model = Autoencoder(
            self.D_in,
            H=self.HiddenLayers_dim,
            latent_dim=self.D_out
        ).to(device)
        self.model.apply(weights_init_uniform_rule)
        self.optimizer = optim.Adam(self.model.parameters(), lr=self.lr)
        self.loss_mse = customLoss()
        self.epochs = self.epochs
        # log_interval = 50
        # val_losses = []
        # train_losses = []
        self.__train()

    def __train(self):
        self.model, self.train_losses = train(
            self.epochs,
            self.trainloader,
            self.model,
            self.optimizer,
            self.loss_mse
        )

    def transform(self, X):
        data_set = DataBuilder(X)
        trainloader = DataLoader(dataset=data_set, batch_size=1024)
        # evaluate
        self.model.eval()
        # output space
        mu_output = []
        logvar_output = []

        with torch.no_grad():
            for i, (data) in enumerate(trainloader):
                data = data.to(device)
                recon_batch, mu, logvar = self.model(data)
                mu_tensor = mu
                mu_output.append(mu_tensor)
                mu_result = torch.cat(mu_output, dim=0)
                logvar_tensor = logvar
                logvar_output.append(logvar_tensor)
                self.logvar_result = torch.cat(logvar_output, dim=0)
        return mu_result.cpu().detach().numpy()

# #%%
# from mpl_toolkits import mplot3d


# import numpy as np
# import matplotlib.pyplot as plt
# #ax = plt.axes(projection='3d')
# #ax = plt.subplot()

# # Data for three-dimensional scattered points
# winetype = data_set.wine
# #zdata = mu_result[:,0].cpu().numpy()
# xdata = mu_result[:,1].cpu().numpy()
# ydata = mu_result[:,2].cpu().numpy()
# plt.scatter(xdata, ydata,c=df.idCluster )
# plt.show()

# #%%
# import umap.umap_ as umap
# nD = 3
# umapReducer = umap.UMAP(random_state=42000, n_components=nD)
# x = umapReducer.fit_transform( mu_result.cpu().numpy())
# #df_x2D = pd.DataFrame(x, columns=["D1", "D2", "D3"])
# #df_x2D = pd.concat([df['filename'], df_x2D, df[list(df_conf.columns[
# 1:])]], axis=1)

# # plt.scatter(x[:,0], x[:,1], c=df.idCluster)
# # plt.show()
# # ""


# import matplotlib.pyplot as plt
# ax = plt.axes(projection='3d')
# #ax = plt.subplot()
# # Data for three-dimensional scattered points
# winetype = data_set.wine
# zdata = mu_result[:,0].cpu().numpy()
# xdata = mu_result[:,1].cpu().numpy()
# ydata = mu_result[:,2].cpu().numpy()
# ax.scatter(xdata, ydata, zdata, c=df.idCluster )
# plt.show()
