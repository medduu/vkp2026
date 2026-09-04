const target = document.querySelector('#target');

function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';

  if (ua.includes('Edg/')) {
    browserName = 'Microsoft Edge';
    browserVersion = ua.split('Edg/')[1];
  } else if (ua.includes('Chrome/')) {
    browserName = 'Google Chrome';
    browserVersion = ua.split('Chrome/')[1].split(' ')[0];
  } else if (ua.includes('Firefox/')) {
    browserName = 'Mozilla Firefox';
    browserVersion = ua.split('Firefox/')[1];
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browserName = 'Safari';
    browserVersion = ua.split('Version/')[1]?.split(' ')[0] || 'Unknown';
  }

  browserVersion = browserVersion.split('.')[0];

  return `${browserName}, ${browserVersion}`;
}

function getOSInfo() {
  const platform = navigator.userAgentData?.platform || navigator.platform;
  return platform;
}

const screenSize = `${screen.width} x ${screen.height}`;

const availableSpace = `${screen.availWidth} x ${screen.availHeight}`;

const now = new Date();

const dateFormatted = now.toLocaleDateString('fi-FI', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const timeFormatted = now.toLocaleTimeString('fi-FI', {
  hour: '2-digit',
  minute: '2-digit',
});

target.insertAdjacentHTML('beforeend', `
  <p>Browser: ${getBrowserInfo()}</p>
  <p>Operating system: ${getOSInfo()}</p>
  <p>Screen size: ${screenSize}</p>
  <p>Available screen space: ${availableSpace}</p>
  <p>Date: ${dateFormatted}</p>
  <p>Time: ${timeFormatted}</p>
`);
