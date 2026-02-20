const { app, BrowserWindow, screen, Tray, Menu, ipcMain, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs'); // Dosya okuma modülünü ekledik

let mainWindow;
let settingsWindow;
let tray = null;
// Ayarları artık Program Files'a değil, kullanıcının AppData klasörüne kaydediyoruz
const userDataPath = app.getPath('userData');
const infoPath = path.join(userDataPath, 'info.json');


// Windows başlangıç ayarını uygulayan fonksiyon
function applyAutoStart() {
  if (fs.existsSync(infoPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
      app.setLoginItemSettings({
        openAtLogin: data.autoStart === true,
        path: app.getPath('exe') // Uygulamanın .exe yolunu gösterir
      });
    } catch(e) { console.error("AutoStart hatası:", e); }
  }
}

app.whenReady().then(() => {
  // Açılışta otomatik başlatma ayarını kontrol et ve uygula
  applyAutoStart();

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: 270,
    height: 75,
    x: width - 290,
    y: height - 95,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    icon: path.join(__dirname, 'images/image.ico'), // YENİ EKLENEN SATIR
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  const emptyIcon = nativeImage.createEmpty();
  tray = new Tray(emptyIcon);

  function openSettings() {
    if (settingsWindow) {
      settingsWindow.focus();
      return;
    }
    settingsWindow = new BrowserWindow({
      width: 350,
      height: 450, // İmza ve checkbox sığsın diye biraz daha yükselttik
      title: "Ayarlar",
      autoHideMenuBar: true,
      resizable: false,
      icon: path.join(__dirname, 'images/image.ico'), // YENİ EKLENEN SATIR
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
    settingsWindow.loadFile('settings.html');
    settingsWindow.on('closed', () => { settingsWindow = null; });
  }

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Detaylı Göster / Gizle', click: () => { mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show(); } },
    { label: 'Ayarlar', click: openSettings },
    { type: 'separator' },
    { label: 'Çıkış', click: () => { app.quit(); } }
  ]);

  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  ipcMain.on('update-tray', (event, dataUrl, tooltipText) => {
    const image = nativeImage.createFromDataURL(dataUrl);
    tray.setImage(image);
    tray.setToolTip(tooltipText);
  });

  // Ayarlar kaydedildiğinde Windows AutoStart ayarını da güncelle
  ipcMain.on('settings-saved', () => {
    applyAutoStart();
    if (mainWindow) {
      mainWindow.webContents.send('reload-settings');
    }
  });

  // HTML dosyalarının "userData" yolunu main.js'den güvenle isteyebilmesi için:
  ipcMain.on('get-userData-path', (event) => {
    event.returnValue = app.getPath('userData');
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
