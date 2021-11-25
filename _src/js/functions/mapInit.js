export const mapInit = (mapID) => {
  let yaMapsShow = false;

  const init = () => {
    let map = new ymaps.Map('map', {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 16,
      controls: []
    });
    let zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: 'small',
        position: {
          top: 250,
          left: 'auto',
          right: 10,
        }
      }
    })
    let geolocationControl = new ymaps.control.GeolocationControl({
      options: {
        position: {
          top: 'auto',
          left: 'auto',
          right: 10,
          bottom: 250
        }
      }
    })
    map.controls.add(zoomControl);
    map.controls.add(geolocationControl);
    let placemark = new ymaps.Placemark(map.getCenter(), {}, {
      iconLayout: 'default#image',
      iconImageHref: './placemark.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-20, -20]
    })
    map.geoObjects.add(placemark);
  }

  const loadScript = (url, callback) => {
    const script = document.createElement("script");

    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      }
    } else {
      script.onload = () => callback();
    }
    script.src = url;
    document.body.append(script);
  }

  const yandexMap = () => {
    mapID.addEventListener('mouseenter', function () {
      if (!yaMapsShow) {
        yaMapsShow = true;
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&loadByRequire=1", () => {
          ymaps.ready(init);
          mapID.querySelector('.slider-lazy-preloader').remove();
        });
      }
    });
  }

  yandexMap();
}