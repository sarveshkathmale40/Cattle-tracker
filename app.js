"use strict";


/* ==================================================
   LANGUAGE DATA
================================================== */

const langData = {

  mr:{
    reminderTitle:"🔔 आजच्या सूचना",

    cow:"🐄 गाय",
    buffalo:"🐃 म्हैस",

    cowStat:"गाय",
    buffaloStat:"म्हैस",
    totalStat:"एकूण",

    formTitle:"🐄 नवीन जनावर नोंद",
    editTitle:"✏️ जनावराची माहिती बदलणे",

    nameLabel:"जनावराचे नाव",
    dateLabel:"गाभण / AI तारीख",
    noteLabel:"नोंद",
    photoLabel:"फोटो",

    save:"💾 माहिती सेव्ह करा",
    update:"💾 माहिती अपडेट करा",

    recordsTitle:"📋 Animal Records",

    noRecords:"अजून कोणतीही नोंद नाही.",

    repeat:"🔁 Repeat / आजची तारीख",
    delete:"🗑️ Delete",

    confirmDelete:
      "हा जनावराचा डेटा कायमचा डिलीट करायचा आहे?",

    editing:
      "Repeat केल्यामुळे AI तारीख आजची केली आहे. बदल सेव्ह करण्यासाठी Update दाबा.",

    heat:"🔄 हीट / रिपीट तपासा",

    dry:
      "🥛 दूध बंद करण्याची वेळ जवळ आली आहे",

    transition:
      "🌾 ट्रान्झिशन फीड सुरू करण्याची वेळ जवळ आली आहे",

    delivery:
      "🐄 अपेक्षित विण्याची तारीख",

    today:"आज",
    tomorrow:"उद्या",
    daysLeft:"दिवस बाकी"
  },


  hi:{
    reminderTitle:"🔔 आज की सूचनाएँ",

    cow:"🐄 गाय",
    buffalo:"🐃 भैंस",

    cowStat:"गाय",
    buffaloStat:"भैंस",
    totalStat:"कुल",

    formTitle:"🐄 नया पशु रिकॉर्ड",
    editTitle:"✏️ पशु की जानकारी बदलें",

    nameLabel:"पशु का नाम",
    dateLabel:"गर्भाधान / AI तारीख",
    noteLabel:"नोट",
    photoLabel:"फोटो",

    save:"💾 जानकारी सेव करें",
    update:"💾 जानकारी अपडेट करें",

    recordsTitle:"📋 Animal Records",

    noRecords:"अभी कोई रिकॉर्ड नहीं है।",

    repeat:"🔁 Repeat / आज की तारीख",
    delete:"🗑️ Delete",

    confirmDelete:
      "क्या इस पशु का डेटा हमेशा के लिए डिलीट करना है?",

    editing:
      "Repeat करने पर AI तारीख आज की कर दी गई है। बदलाव सेव करने के लिए Update दबाएँ।",

    heat:"🔄 हीट / रिपीट चेक करें",

    dry:
      "🥛 दूध बंद करने का समय करीब है",

    transition:
      "🌾 ट्रांजिशन फीड शुरू करने का समय करीब है",

    delivery:
      "🐄 अनुमानित ब्याने की तारीख",

    today:"आज",
    tomorrow:"कल",
    daysLeft:"दिन बाकी"
  },


  en:{
    reminderTitle:"🔔 Today's Reminders",

    cow:"🐄 Cow",
    buffalo:"🐃 Buffalo",

    cowStat:"Cow",
    buffaloStat:"Buffalo",
    totalStat:"Total",

    formTitle:"🐄 New Animal Record",
    editTitle:"✏️ Edit Animal Record",

    nameLabel:"Animal Name",
    dateLabel:"Pregnancy / AI Date",
    noteLabel:"Note",
    photoLabel:"Photo",

    save:"💾 Save Information",
    update:"💾 Update Information",

    recordsTitle:"📋 Animal Records",

    noRecords:"No records yet.",

    repeat:"🔁 Repeat / Use Today",
    delete:"🗑️ Delete",

    confirmDelete:
      "Delete this animal's data permanently?",

    editing:
      "Repeat has set the AI date to today. Press Update to save the change.",

    heat:"🔄 Check for heat / repeat",

    dry:
      "🥛 Dry-off time is approaching",

    transition:
      "🌾 Transition feed time is approaching",

    delivery:
      "🐄 Expected calving date",

    today:"Today",
    tomorrow:"Tomorrow",
    daysLeft:"days left"
  }

};


/* ==================================================
   GLOBAL VARIABLES
================================================== */

let cur = "cow";

let editingId = null;

let currentPhoto = "";

const DB_KEY = "cattle_tracker_db";


/* ==================================================
   LANGUAGE
================================================== */

function getLang(){

  const saved =
    localStorage.getItem(
      "cattle_tracker_lang"
    );

  if(
    saved === "mr" ||
    saved === "hi" ||
    saved === "en"
  ){
    return saved;
  }

  return "mr";
}


function changeLanguage(){

  const select =
    document.getElementById(
      "language"
    );

  if(!select){
    return;
  }

  localStorage.setItem(
    "cattle_tracker_lang",
    select.value
  );

  updateLanguageUI();

  draw();

  drawReminders();
}


function updateLanguageUI(){

  const lang = getLang();

  const t = langData[lang];

  document.documentElement.lang =
    lang;


  const language =
    document.getElementById(
      "language"
    );

  if(language){
    language.value = lang;
  }


  document.getElementById(
    "reminderTitle"
  ).textContent =
    t.reminderTitle;


  document.getElementById(
    "cowStat"
  ).textContent =
    t.cowStat;


  document.getElementById(
    "buffaloStat"
  ).textContent =
    t.buffaloStat;


  document.getElementById(
    "totalStat"
  ).textContent =
    t.totalStat;


  document.getElementById(
    "formTitle"
  ).textContent =
    editingId === null
      ? t.formTitle
      : t.editTitle;


  document.getElementById(
    "nameLabel"
  ).textContent =
    t.nameLabel;


  document.getElementById(
    "dateLabel"
  ).textContent =
    t.dateLabel;


  document.getElementById(
    "noteLabel"
  ).textContent =
    t.noteLabel;


  document.getElementById(
    "photoLabel"
  ).textContent =
    t.photoLabel;


  document.getElementById(
    "recordsTitle"
  ).textContent =
    t.recordsTitle;


  const saveBtn =
    document.getElementById(
      "saveBtn"
    );


  saveBtn.textContent =
    editingId === null
      ? t.save
      : t.update;


  saveBtn.classList.toggle(
    "update",
    editingId !== null
  );


  updateAnimalButtons();
}


/* ==================================================
   ANIMAL
================================================== */

function selectAnimal(type){

  if(
    type !== "cow" &&
    type !== "buffalo"
  ){
    return;
  }

  cur = type;

  updateAnimalButtons();
}


function updateAnimalButtons(){

  const t =
    langData[getLang()];


  const cowBtn =
    document.getElementById(
      "cowBtn"
    );

  const buffaloBtn =
    document.getElementById(
      "buffaloBtn"
    );


  cowBtn.classList.toggle(
    "active",
    cur === "cow"
  );


  buffaloBtn.classList.toggle(
    "active",
    cur === "buffalo"
  );


  cowBtn.textContent =
    t.cow;

  buffaloBtn.textContent =
    t.buffalo;
}


/* ==================================================
   DATABASE
================================================== */

function getDB(){

  try{

    const raw =
      localStorage.getItem(
        DB_KEY
      );


    if(!raw){
      return [];
    }


    const data =
      JSON.parse(raw);


    return Array.isArray(data)
      ? data
      : [];

  }catch(error){

    console.error(
      "Database read error:",
      error
    );

    return [];
  }
}


function setDB(data){

  try{

    localStorage.setItem(
      DB_KEY,
      JSON.stringify(data)
    );

    return true;

  }catch(error){

    console.error(
      "Database save error:",
      error
    );

    alert(
      "Data save failed. Browser storage may be full."
    );

    return false;
  }
}


/* ==================================================
   DATE
================================================== */

function todayISO(){

  const d =
    new Date();


  const y =
    d.getFullYear();


  const m =
    String(
      d.getMonth() + 1
    ).padStart(2,"0");


  const day =
    String(
      d.getDate()
    ).padStart(2,"0");


  return (
    y +
    "-" +
    m +
    "-" +
    day
  );
}


function updateDate(date,days){

  if(!date){
    return "";
  }


  const d =
    new Date(
      date + "T00:00:00"
    );


  if(
    Number.isNaN(
      d.getTime()
    )
  ){
    return "";
  }


  d.setDate(
    d.getDate() + days
  );


  const y =
    d.getFullYear();


  const m =
    String(
      d.getMonth() + 1
    ).padStart(2,"0");


  const day =
    String(
      d.getDate()
    ).padStart(2,"0");


  return (
    y +
    "-" +
    m +
    "-" +
    day
  );
}


function formatDate(date){

  if(!date){
    return "";
  }


  const p =
    date.split("-");


  if(p.length !== 3){
    return date;
  }


  return (
    p[2] +
    "/" +
    p[1] +
    "/" +
    p[0]
  );
}


/* ==================================================
   PREGNANCY SETTINGS
================================================== */

function getPregnancyData(type){

  if(type === "buffalo"){

    return {
      total:310,
      dry:235,
      heat:21,
      transition:289
    };
  }


  return {
    total:282,
    dry:210,
    heat:21,
    transition:261
  };
}


/* ==================================================
   IMAGE COMPRESSION
================================================== */

function compressImage(file){

  return new Promise(
    function(resolve,reject){

      const reader =
        new FileReader();


      reader.onload =
        function(event){

          const img =
            new Image();


          img.onload =
            function(){

              let width =
                img.width;

              let height =
                img.height;


              const maxSize =
                400;


              if(
                width > maxSize ||
                height > maxSize
              ){

                if(width >= height){

                  height =
                    Math.round(
                      height *
                      maxSize /
                      width
                    );

                  width =
                    maxSize;

                }else{

                  width =
                    Math.round(
                      width *
                      maxSize /
                      height
                    );

                  height =
                    maxSize;
                }
              }


              const canvas =
                document.createElement(
                  "canvas"
                );


              canvas.width =
                width;

              canvas.height =
                height;


              const ctx =
                canvas.getContext(
                  "2d"
                );


              ctx.drawImage(
                img,
                0,
                0,
                width,
                height
              );


              resolve(
                canvas.toDataURL(
                  "image/jpeg",
                  0.7
                )
              );
            };


          img.onerror =
            reject;


          img.src =
            event.target.result;
        };


      reader.onerror =
        reject;


      reader.readAsDataURL(
        file
      );
    }
  );
}


/* ==================================================
   PHOTO PREVIEW
================================================== */

async function previewPhoto(){

  const input =
    document.getElementById(
      "photo"
    );


  const preview =
    document.getElementById(
      "photoPreview"
    );


  if(
    !input.files ||
    !input.files.length
  ){
    return;
  }


  try{

    currentPhoto =
      await compressImage(
        input.files[0]
      );


    preview.innerHTML = "";


    const img =
      document.createElement(
        "img"
      );


    img.src =
      currentPhoto;


    img.alt =
      "Animal Photo";


    preview.appendChild(
      img
    );

  }catch(error){

    console.error(
      "Photo error:",
      error
    );
  }
}


/* ==================================================
   CLEAR FORM
================================================== */

function clearForm(){

  editingId =
    null;

  currentPhoto =
    "";


  document.getElementById(
    "animalName"
  ).value = "";


  document.getElementById(
    "pregDate"
  ).value = "";


  document.getElementById(
    "note"
  ).value = "";


  document.getElementById(
    "photo"
  ).value = "";


  document.getElementById(
    "photoPreview"
  ).innerHTML = "";


  const info =
    document.getElementById(
      "editingInfo"
    );


  info.textContent = "";

  info.classList.remove(
    "show"
  );


  updateLanguageUI();
}


/* ==================================================
   SAVE / UPDATE
================================================== */

async function saveData(){

  const name =
    document.getElementById(
      "animalName"
    ).value.trim();


  const pregDate =
    document.getElementById(
      "pregDate"
    ).value;


  const note =
    document.getElementById(
      "note"
    ).value.trim();


  const photoInput =
    document.getElementById(
      "photo"
    );


  if(!pregDate){

    const lang =
      getLang();


    alert(
      lang === "mr"
      ? "कृपया गाभण / AI तारीख निवडा."
      : lang === "hi"
      ? "कृपया गर्भाधान / AI तारीख चुनें।"
      : "Please select Pregnancy / AI date."
    );

    return;
  }


  let photo =
    currentPhoto || "";


  if(
    photoInput.files &&
    photoInput.files.length
  ){

    try{

      photo =
        await compressImage(
          photoInput.files[0]
        );

    }catch(error){

      console.error(
        "Photo compression error:",
        error
      );
    }
  }


  const db =
    getDB();


  /* ================================================
     UPDATE EXISTING RECORD
  ================================================ */

  if(editingId !== null){

    const index =
      db.findIndex(
        function(item){

          return (
            String(item.id) ===
            String(editingId)
          );
        }
      );


    if(index !== -1){

      const oldPhoto =
        db[index].photo || "";


      db[index] = {
        ...db[index],

        type:cur,

        name:name,

        pregDate:pregDate,

        note:note,

        photo:
          photo || oldPhoto,

        updatedAt:
          Date.now()
      };


      if(!setDB(db)){
        return;
      }


      clearForm();

      draw();

      drawReminders();

      return;
    }


    editingId =
      null;
  }


  /* ================================================
     CREATE NEW RECORD
  ================================================ */

  const record = {

    id:
      Date.now().toString() +
      Math.random()
        .toString(36)
        .slice(2,8),

    type:cur,

    name:name,

    pregDate:pregDate,

    note:note,

    photo:photo,

    createdAt:
      Date.now()
  };


  db.push(record);


  if(!setDB(db)){
    return;
  }


  clearForm();

  draw();

  drawReminders();
}


/* ==================================================
   DELETE
================================================== */

function delData(id){

  const t =
    langData[getLang()];


  const targetId =
    String(id);


  const db =
    getDB();


  const exists =
    db.some(
      function(item){

        return (
          String(item.id) ===
          targetId
        );
      }
    );


  if(!exists){
    return;
  }


  const ok =
    window.confirm(
      t.confirmDelete
    );


  if(!ok){
    return;
  }


  const newDB =
    db.filter(
      function(item){

        return (
          String(item.id) !==
          targetId
        );
      }
    );


  if(!setDB(newDB)){
    return;
  }


  if(
    editingId !== null &&
    String(editingId) ===
    targetId
  ){

    clearForm();
  }


  draw();

  drawReminders();
}


/* ==================================================
   REPEAT / CHANGE AI DATE TO TODAY
================================================== */

function repeatData(id){

  const db =
    getDB();


  const targetId =
    String(id);


  const item =
    db.find(
      function(record){

        return (
          String(record.id) ===
          targetId
        );
      }
    );


  if(!item){
    return;
  }


  cur =
    item.type === "buffalo"
      ? "buffalo"
      : "cow";


  editingId =
    item.id;


  currentPhoto =
    item.photo || "";


  document.getElementById(
    "animalName"
  ).value =
    item.name || "";


  /* IMPORTANT:
     Repeat = AI / Pregnancy date = TODAY
  */

  document.getElementById(
    "pregDate"
  ).value =
    todayISO();


  document.getElementById(
    "note"
  ).value =
    item.note || "";


  document.getElementById(
    "photo"
  ).value = "";


  const preview =
    document.getElementById(
      "photoPreview"
    );


  preview.innerHTML = "";


  if(currentPhoto){

    const img =
      document.createElement(
        "img"
      );


    img.src =
      currentPhoto;


    img.alt =
      "Animal Photo";


    preview.appendChild(
      img
    );
  }


  const info =
    document.getElementById(
      "editingInfo"
    );


  info.textContent =
    langData[getLang()].editing;


  info.classList.add(
    "show"
  );


  updateLanguageUI();


  window.scrollTo({
    top:
      document.querySelector(
        ".card"
      ).offsetTop,

    behavior:"smooth"
  });
}


/* ==================================================
   REMINDER DATE DIFFERENCE
================================================== */

function reminderStatus(eventDate){

  const today =
    todayISO();


  const event =
    new Date(
      eventDate + "T00:00:00"
    );


  const now =
    new Date(
      today + "T00:00:00"
    );


  const diffMs =
    event.getTime() -
    now.getTime();


  return Math.round(
    diffMs /
    (1000 * 60 * 60 * 24)
  );
}


/* ==================================================
   REMINDER TEXT
================================================== */

function reminderText(diff){

  const t =
    langData[getLang()];


  if(diff === 0){
    return t.today;
  }


  if(diff === 1){
    return t.tomorrow;
  }


  return (
    diff +
    " " +
    t.daysLeft
  );
}


/* ==================================================
   DRAW REMINDERS
================================================== */

function drawReminders(){

  const container =
    document.getElementById(
      "reminders"
    );


  if(!container){
    return;
  }


  const db =
    getDB();


  const t =
    langData[getLang()];


  container.innerHTML = "";


  let count =
    0;


  db.forEach(
    function(item){

      if(!item.pregDate){
        return;
      }


      const p =
        getPregnancyData(
          item.type
        );


      const animalName =
        item.name ||
        (
          item.type === "buffalo"
          ? t.buffalo
          : t.cow
        );


      const events = [

        {
          days:p.heat,
          text:t.heat,
          icon:"🔄"
        },

        {
          days:p.dry,
          text:t.dry,
          icon:"🥛"
        },

        {
          days:p.transition,
          text:t.transition,
          icon:"🌾"
        },

        {
          days:p.total,
          text:t.delivery,
          icon:"🐄"
        }

      ];


      events.forEach(
        function(event){

          const eventDate =
            updateDate(
              item.pregDate,
              event.days
            );


          if(!eventDate){
            return;
          }


          const diff =
            reminderStatus(
              eventDate
            );


          /*
             SHOW ONLY:
             3 days before
             2 days before
             1 day before
             event day

             Do NOT show after event day.
          */

          if(
            diff < 0 ||
            diff > 3
          ){
            return;
          }


          count++;


          const div =
            document.createElement(
              "div"
            );


          div.className =
            "reminder";


          if(diff === 0){
            div.classList.add(
              "today"
            );
          }


          if(diff === 1){
            div.classList.add(
              "tomorrow"
            );
          }


          const strong =
            document.createElement(
              "strong"
            );


          strong.textContent =
            event.icon +
            " " +
            animalName;


          const text =
            document.createElement(
              "div"
            );


          text.textContent =
            event.text +
            " • " +
            formatDate(eventDate) +
            " • " +
            reminderText(diff);

                    
