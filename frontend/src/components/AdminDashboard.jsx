import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, RefreshCw, DollarSign, TrendingUp, Copy, Trash2, X, Send, Settings, LayoutDashboard } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ total_value: 0, total_donations: 0, copied_count: 0 });
  const [pixKey, setPixKey] = useState('');
  const [newPixKey, setNewPixKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingPixKey, setEditingPixKey] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [modal, setModal] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [telegramChatId, setTelegramChatId] = useState('');
  const [telegramStatus, setTelegramStatus] = useState('');
  const [detectingTelegram, setDetectingTelegram] = useState(false);

  const token = localStorage.getItem('admin_token');

  const fetchData = useCallback(async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [donationsRes, statsRes, configRes, telegramRes] = await Promise.all([
        axios.get(`${API}/admin/donations`, { headers }),
        axios.get(`${API}/admin/stats`, { headers }),
        axios.get(`${API}/admin/config`, { headers }),
        axios.get(`${API}/admin/config/telegram`, { headers }).catch(() => ({ data: { chat_id: '' } }))
      ]);
      setDonations(donationsRes.data);
      setStats(statsRes.data);
      setPixKey(configRes.data.pix_key);
      if (!editingPixKey) setNewPixKey(configRes.data.pix_key);
      setTelegramChatId(telegramRes.data.chat_id || '');
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
    if (!token) { navigate('/donaspainel'); return; }
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [token, navigate, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/donaspainel');
  };

  const handleUpdatePixKey = async () => {
    try {
      await axios.put(`${API}/admin/config/pix-key`, { pix_key: newPixKey }, { headers: { Authorization: `Bearer ${token}` } });
      setPixKey(newPixKey);
      setEditingPixKey(false);
    } catch (error) { console.error('Erro ao atualizar chave PIX'); }
  };

  const handleClearData = async () => {
    try {
      await axios.delete(`${API}/admin/donations`, { headers: { Authorization: `Bearer ${token}` } });
      setConfirmClear(false);
      fetchData();
    } catch (error) { console.error('Erro ao limpar dados'); }
  };

  const handleDeleteDonation = async (donationId) => {
    try {
      await axios.delete(`${API}/admin/donations/${donationId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error) { console.error('Erro ao remover doação'); }
  };

  const handleDetectTelegram = async () => {
    setDetectingTelegram(true);
    setTelegramStatus('');
    try {
      const res = await axios.post(`${API}/admin/config/telegram/detect`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setTelegramChatId(res.data.chat_id);
      setTelegramStatus(res.data.message);
    } catch (err) {
      setTelegramStatus(err.response?.data?.detail || 'Erro ao detectar grupo');
    }
    setDetectingTelegram(false);
  };

  const handleTestTelegram = async () => {
    try {
      await axios.post(`${API}/admin/config/telegram/test`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setTelegramStatus('Mensagem de teste enviada!');
    } catch (err) {
      setTelegramStatus(err.response?.data?.detail || 'Erro ao enviar teste');
    }
  };

  const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (dateString) => new Date(dateString).toLocaleString('pt-BR');

  if (loading) {
    return (
      <div data-testid="dashboard-loading" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  const copiedDonations = donations.filter(d => d.copied);

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-gray-50">
      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold text-gray-800">{modal.title}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600" data-testid="modal-close-button"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[60vh]">
              {modal.items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhum registro encontrado</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Nome</th>
                      <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Valor</th>
                      <th className="text-left py-2 px-3 text-sm font-semibold text-gray-700">Data/Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modal.items.map((d, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-2 px-3 text-sm text-gray-700">{d.donor_name || <span className="text-gray-400 italic">Anônimo</span>}</td>
                        <td className="py-2 px-3 font-bold text-pink-500 text-sm">{formatCurrency(d.value)}</td>
                        <td className="py-2 px-3 text-sm text-gray-500">{formatDate(d.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {modal.items.length > 0 && (
                <div className="border-t-2 border-gray-200 mt-3 pt-3 text-right">
                  <span className="text-sm text-gray-600">Total: </span>
                  <span className="font-bold text-pink-500 text-lg">{formatCurrency(modal.items.reduce((sum, d) => sum + d.value, 0))}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Clear Modal */}
      {confirmClear && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setConfirmClear(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Limpar todos os dados?</h3>
            <p className="text-gray-600 text-sm mb-6">Esta ação é irreversível. Todas as doações registradas serão removidas.</p>
            <div className="flex gap-3">
              <Button onClick={handleClearData} className="flex-1 bg-red-500 text-white hover:bg-red-600 rounded-lg py-3" data-testid="confirm-clear-button">Sim, limpar tudo</Button>
              <Button onClick={() => setConfirmClear(false)} className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg py-3" data-testid="cancel-clear-button">Cancelar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/54mac6cp_logo-horizontal%20%281%29.png" alt="ParaQuemDoar" className="h-8 hidden md:block" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Painel Administrativo</h1>
            </div>
            <div className="flex items-center gap-3">
              {lastUpdate && (
                <span data-testid="last-update-time" className="text-xs text-gray-400 hidden md:block">
                  Atualizado: {lastUpdate.toLocaleTimeString('pt-BR')}
                </span>
              )}
              <Button data-testid="refresh-button" onClick={fetchData} className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-3 py-2"><RefreshCw className="w-4 h-4" /></Button>
              <Button data-testid="logout-button" onClick={handleLogout} className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2 flex items-center gap-2">
                <LogOut className="w-4 h-4" /><span className="hidden md:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 md:px-6 pt-4">
        <div className="flex gap-1 bg-gray-200 rounded-lg p-1 max-w-xs">
          <button
            data-testid="tab-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button
            data-testid="tab-settings"
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Settings className="w-4 h-4" /> Configurações
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6">
        {/* ========== DASHBOARD TAB ========== */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div data-testid="stat-total-value" className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setModal({ title: 'Detalhes - Total Arrecadado', items: donations })}>
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
              <div data-testid="stat-copied-count" className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setModal({ title: 'Detalhes - Códigos Copiados', items: copiedDonations })}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Códigos Copiados</p>
                    <p data-testid="stat-copied-count-value" className="text-2xl md:text-3xl font-bold text-green-500">{stats.copied_count}</p>
                  </div>
                  <Copy className="w-10 h-10 text-green-500 opacity-20" />
                </div>
              </div>
            </div>

            {/* Donations Table */}
            <div data-testid="donations-table-container" className="bg-white rounded-xl shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Doações Geradas</h2>
                <Button data-testid="clear-data-button" onClick={() => setConfirmClear(true)} className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
                  <Trash2 className="w-4 h-4" /> Limpar dados
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="donations-table">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nome</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">CPF/CNPJ</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Telefone</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Valor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data/Hora</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Dispositivo</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Local</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.length === 0 ? (
                      <tr><td colSpan="10" data-testid="no-donations-message" className="text-center py-8 text-gray-500">Nenhuma doação registrada ainda</td></tr>
                    ) : (
                      donations.map((donation, index) => (
                        <tr key={donation.donation_id || index} data-testid={`donation-row-${index}`} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-700">{donation.donor_name || <span className="text-gray-400 italic">Anônimo</span>}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{donation.donor_document || '-'}</td>
                          <td className="py-3 px-4 text-sm text-gray-700">{donation.donor_phone || '-'}</td>
                          <td className="py-3 px-4"><span className="font-bold text-pink-500">{formatCurrency(donation.value)}</span></td>
                          <td className="py-3 px-4">
                            {donation.copied ? (
                              <span data-testid={`donation-status-copied-${index}`} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Copiado</span>
                            ) : (
                              <span data-testid={`donation-status-pending-${index}`} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Pendente</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">{formatDate(donation.created_at)}</td>
                          <td className="py-3 px-4">
                            {donation.device?.includes('Mobile') ? (
                              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Mobile</span>
                            ) : donation.device?.includes('Desktop') ? (
                              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">Desktop</span>
                            ) : <span className="text-gray-400">-</span>}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {donation.location || (donation.device?.includes(' - ') ? donation.device.split(' - ').slice(1).join(' - ') : '-')}
                          </td>
                          <td className="py-3 px-2">
                            <button
                              data-testid={`delete-donation-${index}`}
                              onClick={() => handleDeleteDonation(donation.donation_id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <p data-testid="auto-refresh-indicator" className="text-center text-sm text-gray-500 mt-4">Atualização automática a cada 60 segundos</p>
          </>
        )}

        {/* ========== SETTINGS TAB ========== */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Chave PIX Config */}
            <div data-testid="pix-key-config" className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Configuração da Chave PIX</h2>
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
                    <Button data-testid="pix-key-save-button" onClick={handleUpdatePixKey} className="bg-green-500 text-white hover:bg-green-600 rounded-lg px-6 py-3">Salvar</Button>
                    <Button data-testid="pix-key-cancel-button" onClick={() => { setEditingPixKey(false); setNewPixKey(pixKey); }} className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg px-6 py-3">Cancelar</Button>
                  </div>
                ) : (
                  <Button data-testid="pix-key-edit-button" onClick={() => setEditingPixKey(true)} className="bg-pink-500 text-white hover:bg-pink-600 rounded-lg px-6 py-3">Editar</Button>
                )}
              </div>
            </div>

            {/* Telegram Config */}
            <div data-testid="telegram-config" className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Notificações Telegram</h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    data-testid="telegram-chat-id-input"
                    type="text"
                    value={telegramChatId}
                    disabled
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-100 text-sm"
                    placeholder="Chat ID do grupo"
                  />
                  <Button data-testid="telegram-detect-button" onClick={handleDetectTelegram} disabled={detectingTelegram} className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg px-6 py-3">
                    {detectingTelegram ? 'Detectando...' : 'Detectar grupo'}
                  </Button>
                  {telegramChatId && (
                    <Button data-testid="telegram-test-button" onClick={handleTestTelegram} className="bg-green-500 text-white hover:bg-green-600 rounded-lg px-6 py-3 flex items-center gap-2">
                      <Send className="w-4 h-4" /> Testar
                    </Button>
                  )}
                </div>
                {telegramStatus && <p className="text-sm text-blue-600">{telegramStatus}</p>}
                {!telegramChatId && <p className="text-xs text-gray-500">Adicione o bot ao grupo no Telegram, envie uma mensagem e clique em "Detectar grupo".</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
