'use client';

import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FiMail, FiSearch, FiX, FiUser, FiPhone, 
  FiMessageSquare, FiCalendar, FiChevronUp, 
  FiChevronDown, FiTrash2, FiSend, FiCheckCircle, 
  FiInbox, FiArrowLeft, FiArrowRight 
} from 'react-icons/fi';

// Custom toast notifications
const notifySuccess = (message) => {
  toast.success(message, {
    style: { background: '#31124b', color: '#fff' },
    progressStyle: { background: '#fa9e1b' },
    icon: <FiCheckCircle size={24} color="#fa9e1b" />
  });
};

const notifyError = (message) => {
  toast.error(message, {
    style: { background: '#31124b', color: '#fff' },
    progressStyle: { background: '#fa9e1b' }
  });
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'replied'

  useEffect(() => {
    fetchMessages();
  }, [page]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/Admin/contact-messages?page=${page}&limit=5`);
      const data = await res.json();
      setMessages(data.messages);
      setTotalPages(data.pages);
    } catch (error) {
      notifyError('فشل في تحميل الرسائل');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (id) => {
    setLoading(true);
    try {
      await fetch(`/api/Admin/contact-messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          replied: true,
          replyText: replyText[id],
        }),
      });
      await fetchMessages();
      setReplyText((prev) => ({ ...prev, [id]: '' }));
      notifySuccess('تم الرد على الرسالة بنجاح!');
    } catch (error) {
      console.error('فشل في الرد:', error);
      notifyError('حدث خطأ أثناء الرد!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد أنك تريد حذف هذه الرسالة؟')) return;

    setLoading(true);
    try {
      await fetch(`/api/Admin/contact-messages/${id}`, { method: 'DELETE' });
      await fetchMessages();
      notifySuccess('تم حذف الرسالة بنجاح!');
    } catch (error) {
      console.error('فشل في الحذف:', error);
      notifyError('حدث خطأ أثناء الحذف!');
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(m => 
    (activeTab === 'new' ? !m.replied : m.replied) &&
    (search ? 
      m.name.includes(search) ||
      m.email.includes(search) ||
      m.message.includes(search) : true)
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 min-h-screen" dir="rtl">
      <ToastContainer 
        position="top-right" 
        rtl 
        closeButton={false}
        autoClose={3000}
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center" style={{ color: '#31124b' }}>
            <FiMail className="ml-2" size={28} color="#fa9e1b" />
            <span>إدارة رسائل التواصل</span>
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث في الرسائل..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:border-none focus:ring-opacity-50 transition-all"
              style={{ focusRing: '#fa9e1b' }}
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400" size={18} />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute left-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-lg transition-all flex items-center ${
              activeTab === 'new'
                ? 'border-b-2 border-opacity-100'
                : 'text-gray-500 hover:text-gray-700 border-opacity-0'
            }`}
            onClick={() => setActiveTab('new')}
            style={{ 
              color: activeTab === 'new' ? '#31124b' : undefined,
              borderColor: '#fa9e1b'
            }}
          >
            <FiInbox className="ml-2" size={18} color={activeTab === 'new' ? '#fa9e1b' : 'currentColor'} />
            <span>الرسائل الجديدة</span>
            {messages.filter(m => !m.replied).length > 0 && (
              <span className="mr-2 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: '#fa9e1b', minWidth: '20px', height: '20px' }}>
                {messages.filter(m => !m.replied).length}
              </span>
            )}
          </button>
          <button
            className={`py-2 px-4 font-medium text-lg transition-all flex items-center ${
              activeTab === 'replied'
                ? 'border-b-2 border-opacity-100'
                : 'text-gray-500 hover:text-gray-700 border-opacity-0'
            }`}
            onClick={() => setActiveTab('replied')}
            style={{ 
              color: activeTab === 'replied' ? '#31124b' : undefined,
              borderColor: '#fa9e1b'
            }}
          >
            <FiCheckCircle className="ml-2" size={18} color={activeTab === 'replied' ? '#fa9e1b' : 'currentColor'} />
            <span>الرسائل المجاب عليها</span>
          </button>
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-l-2" style={{ borderColor: '#fa9e1b' }}></div>
          </div>
        )}

        {!loading && filteredMessages.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4" style={{ color: '#31124b' }}>
              {activeTab === 'new' ? 
                <FiInbox size={64} className="mx-auto" style={{ color: '#fa9e1b' }} /> : 
                <FiCheckCircle size={64} className="mx-auto" style={{ color: '#fa9e1b' }} />
              }
            </div>
            <p className="text-xl" style={{ color: '#31124b' }}>
              {activeTab === 'new' ? 'لا توجد رسائل جديدة حالياً' : 'لا توجد رسائل مجاب عليها'}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {filteredMessages.map(msg => (
            <MessageCard
              key={msg._id}
              msg={msg}
              replyText={replyText}
              setReplyText={setReplyText}
              handleReply={handleReply}
              handleDelete={handleDelete}
              loading={loading}
              isReplied={msg.replied}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className={`px-4 py-2 rounded-md flex items-center ${
                page === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'text-white transition-colors'
              }`}
              style={{ 
                backgroundColor: page === 1 ? undefined : '#31124b',
                boxShadow: page === 1 ? undefined : '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <FiArrowRight className="ml-1" size={16} />
              <span>السابق</span>
            </button>
            <div className="flex items-center px-4">
              <span className="rounded-md px-3 py-2 font-medium" style={{ backgroundColor: 'rgba(250, 158, 27, 0.1)', color: '#31124b' }}>
                {page} من {totalPages}
              </span>
            </div>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className={`px-4 py-2 rounded-md flex items-center ${
                page === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'text-white transition-colors'
              }`}
              style={{ 
                backgroundColor: page === totalPages ? undefined : '#31124b',
                boxShadow: page === totalPages ? undefined : '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <span>التالي</span>
              <FiArrowLeft className="mr-1" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageCard({ msg, replyText, setReplyText, handleReply, handleDelete, loading, isReplied }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={`border rounded-lg shadow-sm transition-all mb-4 overflow-hidden ${
      isReplied ? 'border-opacity-50' : 'border-opacity-80 hover:shadow-md'
    }`} style={{ 
      borderColor: isReplied ? 'rgba(250, 158, 27, 0.3)' : '#31124b',
      backgroundColor: isReplied ? 'rgba(250, 158, 27, 0.05)' : 'white' 
    }}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                 style={{ backgroundColor: '#31124b' }}>
              <FiUser size={20} />
            </div>
            <div className="mr-3">
              <h3 className="font-bold text-lg" style={{ color: '#31124b' }}>{msg.name}</h3>
              <p className="text-gray-600 text-sm flex items-center">
                <FiMail size={12} className="ml-1" />
                {msg.email}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 flex items-center">
              <FiCalendar size={12} className="ml-1" />
              {new Date(msg.createdAt).toLocaleString('ar-EG', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mr-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-all"
            >
              {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4">
            <div className="p-3 rounded-lg mb-3" style={{ backgroundColor: 'rgba(49, 18, 75, 0.03)' }}>
              <div className="flex items-center mb-2">
                <div className="flex items-center ml-2 text-gray-600">
                  <FiPhone size={14} className="ml-1" />
                </div>
                <span className="font-medium text-gray-700">الهاتف:</span>
                <span className="mr-2">{msg.phone || 'غير متوفر'}</span>
              </div>
              <div className="flex items-start">
                <div className="flex items-center ml-2 mt-1 text-gray-600">
                  <FiMessageSquare size={14} className="ml-1" />
                </div>
                <div>
                  <span className="font-medium text-gray-700">الرسالة:</span>
                  <p className="mt-1 whitespace-pre-wrap text-gray-700">{msg.message}</p>
                </div>
              </div>
            </div>
            
            {!isReplied && (
              <div className="mt-4">
                <textarea
                  className="w-full border rounded-lg p-3 transition-all focus:ring-2 focus:outline-none focus:border-none"
                  placeholder="اكتب ردك هنا..."
                  rows="3"
                  value={replyText[msg._id] || ''}
                  onChange={(e) => setReplyText((prev) => ({ ...prev, [msg._id]: e.target.value }))}
                  style={{ 
                    borderColor: '#e2e8f0', 
                    focusRing: 'rgba(250, 158, 27, 0.5)' 
                  }}
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleReply(msg._id)}
                    disabled={loading || !replyText[msg._id]}
                    className={`flex items-center py-2 px-4 rounded-md ${
                      loading || !replyText[msg._id]
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'text-white hover:opacity-90 transition-colors'
                    }`}
                    style={{ 
                      backgroundColor: loading || !replyText[msg._id] ? undefined : '#31124b',
                      boxShadow: loading || !replyText[msg._id] ? undefined : '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <FiSend className="ml-1" size={16} />
                    <span>إرسال الرد</span>
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    disabled={loading}
                    className={`flex items-center py-2 px-4 rounded-md ${
                      loading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-50 text-red-600 hover:bg-red-100 transition-colors'
                    }`}
                    style={{ 
                      boxShadow: loading ? undefined : '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <FiTrash2 className="ml-1" size={16} />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            )}
            
            {isReplied && msg.replyText && (
              <div className="mt-4 bg-white p-3 rounded-lg border" style={{ borderColor: 'rgba(250, 158, 27, 0.3)' }}>
                <div className="flex items-center mb-2">
                  <FiCheckCircle size={14} className="ml-1" style={{ color: '#fa9e1b' }} />
                  <span className="font-medium" style={{ color: '#31124b' }}>الرد:</span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{msg.replyText}</p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    disabled={loading}
                    className={`flex items-center py-1 px-3 rounded-md text-sm ${
                      loading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-50 text-red-600 hover:bg-red-100 transition-colors'
                    }`}
                  >
                    <FiTrash2 className="ml-1" size={14} />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}