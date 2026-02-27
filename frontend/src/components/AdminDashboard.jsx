import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, RefreshCw, DollarSign, TrendingUp, Check, Copy } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ total_value: 0, total_donations: 0, copied_count: 0 });
  const [pixKey, setPixKey] = useState('');
  const [newPixKey, setNewPixKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingPixKey, setEditingPixKey] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const token = localStorage.getItem('admin_token');

  const fetchData = useCallback(async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [donationsRes, statsRes, configRes] = await Promise.all([
        axios.get(`${API}/admin/donations`, { headers }),
        axios.get(`${API}/admin/stats`, { headers }),
        axios.get(`${API}/admin/config`, { headers })
      ]);
      setDonations(donationsRes.data);
      setStats(statsRes.data);
      setPixKey(configRes.data.pix_key);
      if (!editingPixKey) setNewPixKey(configRes.data.pix_key);
      setLoading(false);
      setLastUpdate(new Date());
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/donaspainel');
      }
    }
  }, [token, navigate, editingPixKey]);

  useEffect(() => {
    if (!token) {
      navigate('/donaspainel');
      return;
    }
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [token, navigate, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/donaspainel');
  };

  const handleUpdatePixKey = async () => {
    try {
      await axios.put(
        `${API}/admin/config/pix-key`,
        { pix_key: newPixKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPixKey(newPixKey);
      setEditingPixKey(false);
    } catch (error) {
      console.error('Erro ao atualizar chave PIX');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (loading) {
    return (
      <div data-testid="dashboard-loading" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            <div className="flex items-center gap-3">
              {lastUpdate && (
                <span data-testid="last-update-time" className="text-xs text-gray-400 hidden md:block">
                  Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
                </span>
              )}
              <Button
                data-testid="refresh-button"
                onClick={fetchData}
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-3 py-2 flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                data-testid="logout-button"
                onClick={handleLogout}
                className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div data-testid="stat-total-value" className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Arrecadado</p>
                <p data-testid="stat-total-value-amount" className="text-2xl md:text-3xl font-bold text-pink-500">{formatCurrency(stats.total_value)}</p>
              </div>
              <DollarSign className="w-10 h-10 text-pink-500 opacity-20" />
            </div>
          </div>

          <div data-testid="stat-total-donations" className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Doações</p>
                <p data-testid="stat-total-donations-count" className="text-2xl md:text-3xl font-bold text-purple-500">{stats.total_donations}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>

          <div data-testid="stat-copied-count" className="bg-white rounded-xl shadow-md p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Códigos Copiados</p>
                <p data-testid="stat-copied-count-value" className="text-2xl md:text-3xl font-bold text-green-500">{stats.copied_count}</p>
              </div>
              <Copy className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Chave PIX Config */}
        <div data-testid="pix-key-config" className="bg-white rounded-xl shadow-md p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Configuração da Chave PIX</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              data-testid="pix-key-input"
              type="text"
              value={newPixKey}
              onChange={(e) => setNewPixKey(e.target.value)}
              disabled={!editingPixKey}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors disabled:bg-gray-100"
              placeholder="Digite a chave PIX"
            />
            {editingPixKey ? (
              <div className="flex gap-2">
                <Button
                  data-testid="pix-key-save-button"
                  onClick={handleUpdatePixKey}
                  className="bg-green-500 text-white hover:bg-green-600 rounded-lg px-6 py-3"
                >
                  Salvar
                </Button>
                <Button
                  data-testid="pix-key-cancel-button"
                  onClick={() => {
                    setEditingPixKey(false);
                    setNewPixKey(pixKey);
                  }}
                  className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg px-6 py-3"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                data-testid="pix-key-edit-button"
                onClick={() => setEditingPixKey(true)}
                className="bg-pink-500 text-white hover:bg-pink-600 rounded-lg px-6 py-3"
              >
                Editar
              </Button>
            )}
          </div>
        </div>

        {/* Donations Table */}
        <div data-testid="donations-table-container" className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Doações Geradas</h2>

          <div className="overflow-x-auto">
            <table className="w-full" data-testid="donations-table">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data/Hora</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Doador</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Valor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Código PIX</th>
                </tr>
              </thead>
              <tbody>
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan="5" data-testid="no-donations-message" className="text-center py-8 text-gray-500">
                      Nenhuma doação registrada ainda
                    </td>
                  </tr>
                ) : (
                  donations.map((donation, index) => (
                    <tr key={donation.donation_id || index} data-testid={`donation-row-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {formatDate(donation.created_at)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {donation.donor_name || <span className="text-gray-400 italic">Anônimo</span>}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-pink-500">
                          {formatCurrency(donation.value)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {donation.copied ? (
                          <span data-testid={`donation-status-copied-${index}`} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Copiado
                          </span>
                        ) : (
                          <span data-testid={`donation-status-pending-${index}`} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Pendente
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-500 font-mono max-w-xs truncate">
                        {donation.pix_code ? donation.pix_code.substring(0, 50) + '...' : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p data-testid="auto-refresh-indicator" className="text-center text-sm text-gray-500 mt-4">
          Atualização automática a cada 10 segundos
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
