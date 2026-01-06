export type Language = 'en' | 'my' | 'zh' | 'th';

export interface Translations {
  [key: string]: {
    en: string;
    my: string;
    zh: string;
    th: string;
  };
}

export const translations: Translations = {
  // Navigation
  dashboard: {
    en: 'Dashboard',
    my: 'ဒက်ရှ်ဘုတ်',
    zh: '仪表板',
    th: 'แดชบอร์ด',
  },
  market: {
    en: 'Market',
    my: 'စျေးကွက်',
    zh: '市场',
    th: 'ตลาด',
  },
  wallet: {
    en: 'Wallet',
    my: 'ပိုက်ဆံအိတ်',
    zh: '钱包',
    th: 'กระเป๋าเงิน',
  },
  settings: {
    en: 'Settings',
    my: 'ဆက်တင်များ',
    zh: '设置',
    th: 'การตั้งค่า',
  },
  logout: {
    en: 'Logout',
    my: 'ထွက်မည်',
    zh: '登出',
    th: 'ออกจากระบบ',
  },

  // Dashboard
  totalBalance: {
    en: 'Total Balance',
    my: 'စုစုပေါင်း လက်ကျန်ငွေ',
    zh: '总余额',
    th: 'ยอดเงินคงเหลือทั้งหมด',
  },
  portfolioPerformance: {
    en: 'Portfolio Performance',
    my: 'ရင်းနှီးမြှုပ်နှံမှု စွမ်းဆောင်ရည်',
    zh: '投资组合表现',
    th: 'ผลการดำเนินงานพอร์ต',
  },
  yourAssets: {
    en: 'Your Assets',
    my: 'သင့်ပိုင်ဆိုင်မှုများ',
    zh: '您的资产',
    th: 'สินทรัพย์ของคุณ',
  },
  recentActivity: {
    en: 'Recent Activity',
    my: 'မကြာသေးမီက လှုပ်ရှားမှုများ',
    zh: '最近活动',
    th: 'กิจกรรมล่าสุด',
  },

  // Market
  coin: {
    en: 'Coin',
    my: 'ဒင်္ဂါး',
    zh: '币种',
    th: 'เหรียญ',
  },
  price: {
    en: 'Price',
    my: 'စျေးနှုန်း',
    zh: '价格',
    th: 'ราคา',
  },
  change24h: {
    en: '24h Change',
    my: '၂၄နာရီ ပြောင်းလဲမှု',
    zh: '24小时变化',
    th: 'การเปลี่ยนแปลง 24 ชม.',
  },
  marketCap: {
    en: 'Market Cap',
    my: 'စျေးကွက် တန်ဖိုး',
    zh: '市值',
    th: 'มูลค่าตลาด',
  },
  action: {
    en: 'Action',
    my: 'လုပ်ဆောင်ချက်',
    zh: '操作',
    th: 'การดำเนินการ',
  },
  buy: {
    en: 'Buy',
    my: 'ဝယ်မည်',
    zh: '买入',
    th: 'ซื้อ',
  },
  sell: {
    en: 'Sell',
    my: 'ရောင်းမည်',
    zh: '卖出',
    th: 'ขาย',
  },

  // Wallet
  deposit: {
    en: 'Deposit',
    my: 'ငွေသွင်းမည်',
    zh: '存款',
    th: 'ฝาก',
  },
  withdraw: {
    en: 'Withdraw',
    my: 'ထုတ်ယူမည်',
    zh: '取款',
    th: 'ถอน',
  },
  balance: {
    en: 'Balance',
    my: 'လက်ကျန်',
    zh: '余额',
    th: 'ยอดคงเหลือ',
  },
  value: {
    en: 'Value',
    my: 'တန်ဖိုး',
    zh: '价值',
    th: 'มูลค่า',
  },

  // Auth
  signIn: {
    en: 'Sign In',
    my: 'ဝင်ရောက်မည်',
    zh: '登录',
    th: 'เข้าสู่ระบบ',
  },
  signUp: {
    en: 'Sign Up',
    my: 'စာရင်းသွင်းမည်',
    zh: '注册',
    th: 'สมัครสมาชิก',
  },
  email: {
    en: 'Email',
    my: 'အီးမေးလ်',
    zh: '电子邮件',
    th: 'อีเมล',
  },
  password: {
    en: 'Password',
    my: 'စကားဝှက်',
    zh: '密码',
    th: 'รหัสผ่าน',
  },
  confirmPassword: {
    en: 'Confirm Password',
    my: 'စကားဝှက် အတည်ပြုပါ',
    zh: '确认密码',
    th: 'ยืนยันรหัสผ่าน',
  },
  welcomeBack: {
    en: 'Welcome Back',
    my: 'ပြန်လည် ကြိုဆိုပါတယ်',
    zh: '欢迎回来',
    th: 'ยินดีต้อนรับกลับ',
  },
  createAccount: {
    en: 'Create Account',
    my: 'အကောင့် ဖန်တီးမည်',
    zh: '创建账户',
    th: 'สร้างบัญชี',
  },
  noAccount: {
    en: "Don't have an account?",
    my: 'အကောင့် မရှိသေးဘူးလား?',
    zh: '没有账户?',
    th: 'ยังไม่มีบัญชี?',
  },
  haveAccount: {
    en: 'Already have an account?',
    my: 'အကောင့် ရှိပြီးသားလား?',
    zh: '已有账户?',
    th: 'มีบัญชีอยู่แล้ว?',
  },

  // 2FA
  twoFactorAuth: {
    en: 'Two-Factor Authentication',
    my: 'နှစ်ထပ် အတည်ပြုခြင်း',
    zh: '双因素认证',
    th: 'การยืนยันตัวตนสองขั้นตอน',
  },
  enterPin: {
    en: 'Enter your 6-digit PIN',
    my: 'သင့် ၆ လုံး PIN ကို ထည့်ပါ',
    zh: '请输入您的6位PIN码',
    th: 'กรุณาใส่รหัส PIN 6 หลัก',
  },
  verifyPin: {
    en: 'Verify PIN',
    my: 'PIN အတည်ပြုပါ',
    zh: '验证PIN',
    th: 'ยืนยัน PIN',
  },
  invalidPin: {
    en: 'Invalid PIN. Please try again.',
    my: 'PIN မမှန်ပါ။ ထပ်ကြိုးစားပါ။',
    zh: 'PIN无效，请重试。',
    th: 'PIN ไม่ถูกต้อง กรุณาลองอีกครั้ง',
  },
  pinHint: {
    en: 'Default PIN: 123456',
    my: 'မူရင်း PIN: 123456',
    zh: '默认PIN: 123456',
    th: 'PIN เริ่มต้น: 123456',
  },

  // Common
  loading: {
    en: 'Loading...',
    my: 'ဖွင့်နေသည်...',
    zh: '加载中...',
    th: 'กำลังโหลด...',
  },
  error: {
    en: 'Error',
    my: 'အမှား',
    zh: '错误',
    th: 'ข้อผิดพลาด',
  },
  success: {
    en: 'Success',
    my: 'အောင်မြင်ပါပြီ',
    zh: '成功',
    th: 'สำเร็จ',
  },
  cancel: {
    en: 'Cancel',
    my: 'ပယ်ဖျက်မည်',
    zh: '取消',
    th: 'ยกเลิก',
  },
  confirm: {
    en: 'Confirm',
    my: 'အတည်ပြုမည်',
    zh: '确认',
    th: 'ยืนยัน',
  },
  amount: {
    en: 'Amount',
    my: 'ပမာဏ',
    zh: '金额',
    th: 'จำนวน',
  },
  selectLanguage: {
    en: 'Select Language',
    my: 'ဘာသာစကား ရွေးချယ်ပါ',
    zh: '选择语言',
    th: 'เลือกภาษา',
  },

  // Settings Page
  manageYourAccount: {
    en: 'Manage your account settings and preferences',
    my: 'သင့်အကောင့် ဆက်တင်များနှင့် နှစ်သက်ရာများကို စီမံပါ',
    zh: '管理您的账户设置和偏好',
    th: 'จัดการการตั้งค่าบัญชีและการตั้งค่าของคุณ',
  },
  profileSettings: {
    en: 'Profile Settings',
    my: 'ပရိုဖိုင် ဆက်တင်များ',
    zh: '个人资料设置',
    th: 'การตั้งค่าโปรไฟล์',
  },
  updateYourProfile: {
    en: 'Update your personal information',
    my: 'သင့်ကိုယ်ရေးအချက်အလက်များကို အပ်ဒိတ်လုပ်ပါ',
    zh: '更新您的个人信息',
    th: 'อัปเดตข้อมูลส่วนตัวของคุณ',
  },
  displayName: {
    en: 'Display Name',
    my: 'ပြသမည့်အမည်',
    zh: '显示名称',
    th: 'ชื่อที่แสดง',
  },
  enterDisplayName: {
    en: 'Enter your display name',
    my: 'သင့်ပြသမည့်အမည်ကို ထည့်ပါ',
    zh: '输入您的显示名称',
    th: 'ใส่ชื่อที่แสดงของคุณ',
  },
  saveChanges: {
    en: 'Save Changes',
    my: 'ပြောင်းလဲမှုများ သိမ်းမည်',
    zh: '保存更改',
    th: 'บันทึกการเปลี่ยนแปลง',
  },
  profileUpdated: {
    en: 'Profile updated successfully',
    my: 'ပရိုဖိုင် အောင်မြင်စွာ အပ်ဒိတ်လုပ်ပြီးပါပြီ',
    zh: '个人资料更新成功',
    th: 'อัปเดตโปรไฟล์สำเร็จ',
  },
  securitySettings: {
    en: 'Security Settings',
    my: 'လုံခြုံရေး ဆက်တင်များ',
    zh: '安全设置',
    th: 'การตั้งค่าความปลอดภัย',
  },
  changeYour2FaPin: {
    en: 'Change your 2FA PIN code',
    my: 'သင့် 2FA PIN ကုဒ်ကို ပြောင်းပါ',
    zh: '更改您的2FA PIN码',
    th: 'เปลี่ยนรหัส PIN 2FA ของคุณ',
  },
  currentPin: {
    en: 'Current PIN',
    my: 'လက်ရှိ PIN',
    zh: '当前PIN',
    th: 'PIN ปัจจุบัน',
  },
  newPin: {
    en: 'New PIN',
    my: 'PIN အသစ်',
    zh: '新PIN',
    th: 'PIN ใหม่',
  },
  confirmNewPin: {
    en: 'Confirm New PIN',
    my: 'PIN အသစ် အတည်ပြုပါ',
    zh: '确认新PIN',
    th: 'ยืนยัน PIN ใหม่',
  },
  updatePin: {
    en: 'Update PIN',
    my: 'PIN အပ်ဒိတ်လုပ်မည်',
    zh: '更新PIN',
    th: 'อัปเดต PIN',
  },
  pinUpdated: {
    en: 'PIN updated successfully',
    my: 'PIN အောင်မြင်စွာ အပ်ဒိတ်လုပ်ပြီးပါပြီ',
    zh: 'PIN更新成功',
    th: 'อัปเดต PIN สำเร็จ',
  },
  pinMustBe6Digits: {
    en: 'PIN must be exactly 6 digits',
    my: 'PIN သည် ဂဏန်း ၆ လုံး ဖြစ်ရမည်',
    zh: 'PIN必须是6位数字',
    th: 'PIN ต้องเป็นตัวเลข 6 หลักพอดี',
  },
  pinsDontMatch: {
    en: 'PINs do not match',
    my: 'PIN များ မတူညီပါ',
    zh: 'PIN不匹配',
    th: 'PIN ไม่ตรงกัน',
  },
  currentPinIncorrect: {
    en: 'Current PIN is incorrect',
    my: 'လက်ရှိ PIN မမှန်ပါ',
    zh: '当前PIN不正确',
    th: 'PIN ปัจจุบันไม่ถูกต้อง',
  },
  languageSettings: {
    en: 'Language Settings',
    my: 'ဘာသာစကား ဆက်တင်များ',
    zh: '语言设置',
    th: 'การตั้งค่าภาษา',
  },
  chooseYourLanguage: {
    en: 'Choose your preferred language',
    my: 'သင်နှစ်သက်သော ဘာသာစကားကို ရွေးချယ်ပါ',
    zh: '选择您的首选语言',
    th: 'เลือกภาษาที่คุณต้องการ',
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  my: 'မြန်မာ',
  zh: '中文',
  th: 'ไทย',
};

export const languageFlags: Record<Language, string> = {
  en: '🇺🇸',
  my: '🇲🇲',
  zh: '🇨🇳',
  th: '🇹🇭',
};
