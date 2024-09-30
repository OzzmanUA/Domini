// Импортируем изображения
import image1 from './images/dom_master.png';
import image2 from './images/rem_tech.png';
import image3 from './images/ozdob_rob.png';
import image4 from './images/byd_rob.png';
import image5 from './images/mebl_rob.png';
import image6 from './images/clean_poslug.png';
import image7 from './images/transport_poslugs.png';
import image8 from './images/pobut_poslugs.png';

const categoriesList = [
    {
      image: image1,
      title: "Домашній майстер",
      subcategories: ["Сантехнік", "Електрик", "Чоловік на годину", "Столяр"]
    },
    {
      image: image2,
      title: "Ремонт техніки",
      subcategories: ["Ремонт великої побутової техніки", "Комп'ютерна допомога"]
    },
    {
      image: image3,
      title: "Оздоблювальні роботи",
      subcategories: ["Ремонт квартир", "Штукатурні роботи", "Утеплення приміщень"]
    },
    {
      image: image4,
      title: "Будівельні роботи",
      subcategories: ["Різноробочі", "Зварювальні роботи", "Кладка цегли"]
    },
    {
      image: image5,
      title: "Меблеві роботи",
      subcategories: ["Виготовлення меблів", "Ремонт меблів", "Збирання меблів"]
    },
    {
      image: image6,
      title: "Клінінгові послуги",
      subcategories: ["Прибирання квартир", "Генеральне прибирання", "Хімчистка"]
    },
    {
      image: image7,
      title: "Транспортні та складські послуги",
      subcategories: ["Вантажні перевезення", "Послуги вантажників", "Вивіз сміття"]
    },
    {
      image: image8,
      title: "Побутові послуги",
      subcategories: ["Сад і город", "Послуги кухаря", "Догляд за одягом"]
    }
  ];

  export default categoriesList;