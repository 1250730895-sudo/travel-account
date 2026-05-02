// ==================== 数据库工具 ====================
const DB = {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  add(key, item) {
    const data = this.get(key);
    item.id = Date.now().toString();
    item.createTime = new Date().toISOString();
    data.unshift(item);
    this.set(key, data);
    return item;
  },

  remove(key, id) {
    const data = this.get(key).filter(item => item.id !== id);
    this.set(key, data);
  },

  update(key, id, newData) {
    const data = this.get(key).map(item => 
      item.id === id ? {...item, ...newData} : item
    );
    this.set(key, data);
  },

  clear(key) {
    this.set(key, []);
  }
};

// ==================== 汇率表 ====================
const RATES = {
  CNY: 1,
  USD: 7.2,
  EUR: 7.8,
  JPY: 0.048,
  HKD: 0.92,
  KRW: 0.0054,
  THB: 0.20,
  GBP: 9.1
};

const CURRENCY_SYMBOLS = {
  CNY: '¥', USD: '$', EUR: '€', JPY: '¥',
  HKD: 'HK$', KRW: '₩', THB: '฿', GBP: '£'
};

// ==================== 消费类别 ====================
const CATEGORIES = [
  { id: 'food', name: '餐饮', icon: '🍜', color: '#ff6b6b' },
  { id: 'transport', name: '交通', icon: '🚗', color: '#4ecdc4' },
  { id: 'hotel', name: '住宿', icon: '🏨', color: '#45b7d1' },
  { id: 'ticket', name: '门票', icon: '🎫', color: '#96ceb4' },
  { id: 'shopping', name: '购物', icon: '🛍️', color: '#feca57' },
  { id: 'entertainment', name: '娱乐', icon: '🎭', color: '#ff9ff3' },
  { id: 'other', name: '其他', icon: '📦', color: '#a29bfe' }
];

// ==================== 初始化数据 ====================
function initData() {
  if (DB.get('settings').length === 0) {
    DB.set('settings', [{ tripName: '我的旅行', baseCurrency: 'CNY' }]);
  }
  if (DB.get('members').length === 0) {
    DB.set('members', [{ id: '1', name: '我' }]);
  }
}

// ==================== 通用函数 ====================
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function getSettings() {
  return DB.get('settings')[0] || { tripName: '我的旅行', baseCurrency: 'CNY' };
}

function getMembers() {
  return DB.get('members');
}

function getBills() {
  return DB.get('bills');
}

function toCNY(amount, currency) {
  return amount * (RATES[currency] || 1);
}
