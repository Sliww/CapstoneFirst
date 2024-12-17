# 🧑‍🍳 **ALEDOBRE**  

**ALEDOBRE** è un gestionale di prenotazioni sviluppato per supportare mio fratello nel lancio della sua attività. Il progetto consente agli utenti di prenotare uno **chef a domicilio** specializzato in **cucina polacca**, offrendo un'esperienza culinaria unica con piatti tradizionali.  

⚠️ **Nota**: Al momento il progetto è stato sviluppato come esame finale per il corso di Full Stack Developer presso Epicode ma non è minimamente definitivo. L'obiettivo è di migliorarlo e renderlo più funzionale e performante implementando le funzionalità più innovativo e migliorando quelle gia presenti. 

⚠️ **Disclaimer**: Tutte le immagini presenti nel progetto sono state prese da internet e sono state utilizzate solo per scopi di test e di esempio per scopo ACCADEMICO E PROGETTO, non sono assolutamente a scopo COMMERCIALE. Nel caso in cui il sito verrà avviato le immagini verranno rimosse e saranno sostituite da foto reali.

---

## 🚀 **Funzionalità principali**  

### 🌟 **Pagine principali**  
1. **🏠 Home Page**  
   - Informazioni principali sullo chef e sul servizio.  
   - Dettagli su come funziona la prenotazione.  
   - Spiegazione su come verrà lasciata la cucina dopo il servizio.  
   - Pulsante per accedere alla pagina **Prenota**.  

2. **📅 Pagina Prenota**  
   - Contiene un **form** per effettuare la prenotazione.  
   - Possibilità di scegliere il **menu** e personalizzare i piatti a proprio piacimento.  

3. **🥟 Sezione "La Tradizione"**  
   - Breve descrizione della **storia culinaria polacca**.  
   - Presentazione dei piatti più famosi della cultura polacca.  

4. **📞 Sezione Contatti**  
   - Informazioni di contatto per comunicare direttamente con lo chef.  

5. **👤 Pagina Profilo Utente**  
   - Possibilità di creare un account e autenticarsi.  
   - Gestione delle prenotazioni effettuate dall'utente.  

6. **🔑 Pagina Registrazione**  
   - Form per la **creazione di un nuovo account utente**.  

---

### 🛠️ **Gestione lato ADMIN**  
- **⚙️ Pannello di Controllo Admin**:  
   - Visualizzazione di tutti gli **utenti registrati**.  
   - Gestione delle **prenotazioni** effettuate.  
   - **Aggiunta** di nuovi piatti al menu.  

---

## 🛠️ **Tecnologie utilizzate**  

### 💻 **Frontend**  
- **HTML5**, **CSS3**, **JavaScript**  
- **React** con **Vite.js** per componenti dinamici e un'applicazione performante.  
- **Bootstrap** e **Media Queries** per garantire la responsività.  
- **React Icons** per icone interattive.  
- **React Hot Toast** per notifiche dinamiche.  
- **SweetAlert** per modali di conferma e avvisi.  

### ⚙️ **Backend**  
- **Node.js** e **Express.js** per la logica server-side e la gestione delle **API REST**.  
- **Bcrypt** per la gestione sicura delle password.  

### 🗄️ **Database**  
- **MongoDB** per la gestione dei dati.  

### 🔐 **Autenticazione**  
- **JWT** (JSON Web Tokens) per un sistema di autenticazione sicuro.  

### ☁️ **Cloud Storage**  
- **Cloudinary** per l'upload e la gestione delle immagini.  

---

## 📦 **Installazione**  

Per avviare il progetto localmente, segui questi passaggi: 

**Clona la repository**:  
git clone https://github.com/Sliww/CapstoneFirst.git

Dopodichè installa le dipendenze per il frontend e il backend con i relativi file .env:

**Backend**: 

cd aledobre-db
npm install

FILE ENV: 

DB_URI
DEBUG_MODE
JWT_SECRET
SESSION_SECRET
API_KEY
API_SECRET
CLOUD_NAME

**Frontend**:

cd aledobre-frontend
npm install

FILE ENV:

VITE_SERVER_BASE_URL_EPI

Dopodichè avvia il server backend:

cd aledobre-db
npm run dev 

Avvia il server frontend:

cd aledobre-frontend
npm run dev

---
---

🚧 **Prossimi sviluppi e obiettivi futuri**
- Implementazione di un sistema di pagamento online.
- Aggiunta di un sistema di feedback da parte dei clienti.
- Rilascio ufficiale del sito online con ottimizzazioni avanzate.

👨‍💻 **Autore**
Nome: Mateusz Sliwinski
GitHub: Sliww

🎉 Grazie per aver visitato il progetto!