// --------------- 修复1：重命名冲突的变量，区分不同目标日期 ---------------
// 函数1：计算距离2025年12月12日的天数（重命名变量为 dayCalcTargetDate）
function calculateDaysToTarget() {
  // 1. 定义目标日期（2025年12月12日）：月份0-11，12月对应11
  const dayCalcTargetDate = new Date(2025, 11, 13);
  // 2. 获取当前日期（重置时分秒，避免当天时间误差）
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  // 3. 计算时间差 → 转换为天数
  const timeDiff = now - dayCalcTargetDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  // 4. 渲染到页面（兼容元素未加载的情况）
  const dayCountEl = document.getElementById('day-count');
  if (dayCountEl) { // 先判断元素是否存在，避免报错
    dayCountEl.textContent = Math.max(daysDiff, 1);
  }
}

// --------------- 函数2：更新报名/考试倒计时（变量名保留但区分作用域） ---------------
function updateCountdown() {
  // 1. 设定目标日期（报名/考试）
//   const registerTargetDate = new Date('2025-12-11T00:00:00').getTime(); // 重命名：registerTargetDate
//   const examTargetDate = new Date('2025-12-11T00:00:00').getTime();
    const registerTargetDate = new Date('2026-01-05T00:00:00').getTime(); // 重命名：registerTargetDate
    const examTargetDate = new Date('2026-05-16T00:00:00').getTime();
  
  // 2. 获取当前时间
  const now = new Date().getTime();
  
  // 3. 计算剩余天数
  const registerDistance = registerTargetDate - now;
  const examDistance = examTargetDate - now;
  const registerDays = Math.ceil(registerDistance / (1000 * 60 * 60 * 24));
  const examDays = Math.ceil(examDistance / (1000 * 60 * 60 * 24));
  const rawDays = examDistance / (1000 * 60 * 60 * 24); 
    // console.log(examDays)
    // 2. 保留六位小数
    const daysWith6Decimal = Math.round(rawDays * 1000000) / 1000000; 
    // console.log("保留六位小数：", daysWith6Decimal); // 输出：14.289

    // 3. 拆分整数和四位小数部分（精准版）
    const fixedStr = daysWith6Decimal.toFixed(6); // "14.2890"
    const [integerStr, decimalStr] = fixedStr.split('.'); 

    const integerPart = Number(integerStr); // 整数部分：14
    const decimalPart = Number(decimalStr); // 小数部分：2890
    // console.log("小数部分：", decimalPart)
  const examHours = Math.round((integerPart*24 + decimalPart/1000000*24) * 10000) / 10000



  // 4. 渲染到页面（先判断元素是否存在）
  const displayEl = document.getElementById('countdown-display');
  if (!displayEl) return; // 元素不存在则终止执行

  // 5. 根据时间差显示内容
  if (-10 < registerDays && registerDays < 0 && integerPart > 0)  {
    displayEl.innerHTML = `报名已经开始！
      <span style="padding-left: 50px;">&nbsp</span></br> 
      距离考试还有 <span class="highlight-number">${integerPart}</span>
      <span class="highlight-number-decimalPart">.${decimalPart}</span> 天
      <span class="highlight-number-decimalPart">=&nbsp${examHours.toFixed(4)}</span> 小时
      `;
  } else if (integerPart < 0) {
    displayEl.innerHTML = `<span class="highlight-name">考试已结束！</span>`
  } else {
    displayEl.innerHTML = `
        距离<span class="highlight-name"><a href="https://ausm.mof.gov.cn/index/" class="reset-link">会计</a></span>
        报名日还有 <span class="highlight-number">${registerDays}</span> 天<br>
        距离考试还有 <span class="highlight-number">${integerPart}</span><span class="highlight-number-decimalPart">.${decimalPart}</span> 天
        </br>
        &nbsp=<span class="highlight-number-decimalPart">${examHours.toFixed(4)}</span>小时
        `;
  }
}

// 1. 补零函数：确保月份/日期/小时/分钟/秒都是两位数（比如9→09）
function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

// 2. 更新时间函数：格式化并渲染时间
function updateTime() {
    const now = new Date();
    // 提取年月日时分秒（注意月份从0开始，需+1）
    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1);
    const day = padZero(now.getDate());
    const hour = padZero(now.getHours());
    const minute = padZero(now.getMinutes());
    const second = padZero(now.getSeconds());
    
    // 拼接成指定格式：2025-12-12 11:34:56
    const timeStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    
    // 渲染到页面
    document.querySelector('.current-time').textContent = timeStr;
}

// 3. 初始化执行一次 + 每秒刷新（1000毫秒=1秒）
updateTime();
setInterval(updateTime, 1000);





// --------------- 修复2：确保DOM加载完成后执行所有函数 ---------------
// 方式1：监听DOMContentLoaded（推荐，比window.onload更早执行）
document.addEventListener('DOMContentLoaded', function() {
  calculateDaysToTarget(); // 执行天数计算
  updateCountdown();       // 执行倒计时更新
  // 可选：开启倒计时实时刷新（0.1秒更新一次）
  setInterval(updateCountdown, 100);
});

// 兼容旧浏览器的兜底（可选）
window.onload = function() {
  calculateDaysToTarget();
  updateCountdown();
};