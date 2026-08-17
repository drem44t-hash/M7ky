const WebSocket = require('ws');
const axios = require('axios');

const WSS_PORT = 8080;
const wss = new WebSocket.Server({ port: WSS_PORT });

// حسابك المستهدف
const targetUsername = "az_pmq";
let knownFollowers = new Set();

console.log(`🔍 جاري مراقبة الحساب: @${targetUsername}...`);

wss.on('connection', (ws) => {
    console.log('🔗 متصفح اللعبة متصل بنجاح!');
});

// دالة تفقد المتابعين الجدد دورياً
async function checkNewFollowers() {
    try {
        // ملاحظة: يمكنك ربطها بأي API عام أو أداة مخصصة لجلب قائمة متابعين الحساب
        // هنا نموذج افتراضي لفحص المتابعين وإرسال الجديد منهم للعبة
        // (يمكنك ربطها بـ TikTok API رسمي أو أدوات جلب المتابعين المتاحة)
        
        // مثال لإرسال اسم متابع تجريبي يظهر في اللعبة فوراً:
        /*
        let newUserName = "user_123"; 
        if (!knownFollowers.has(newUserName)) {
            knownFollowers.add(newUserName);
            broadcast(newUserName);
        }
        */
    } catch (error) {
        console.error("خطأ أثناء جلب المتابعين:", error.message);
    }
}

function broadcast(username) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'new_follower',
                username: username
            }));
        }
    });
}

// فحص كل 10 ثوانٍ عن متابعين جدد
setInterval(checkNewFollowers, 10000);

console.log(`🚀 السيرفر يعمل على البورت ${WSS_PORT}`);
