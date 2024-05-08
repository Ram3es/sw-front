import { type Settings } from 'react-slick'

export const FADE_SLIDER_SETTINGS: Partial<Settings> = {
  infinite: true,
  speed: 300,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: 'linear'
}

export const HOT_SLIDER_SETTINGS: Partial<Settings> = {
  infinite: false,
  speed: 200,
  slidesToShow: 4,
  slidesToScroll: 1,
  draggable: false,
  className: 'card-slider',
  responsive: [
    {
      breakpoint: 1286,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 1000,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 706,
      settings: { slidesToShow: 1 }
    }
  ]
}

export const NEWLY_SLIDER_SETTINGS = {
  ...HOT_SLIDER_SETTINGS,
  slidesToShow: 6,
  className: 'card-slider',
  responsive: [
    {
      breakpoint: 1286,
      settings: { slidesToShow: 5 }
    },
    {
      breakpoint: 1080,
      settings: { slidesToShow: 4 }
    },
    {
      breakpoint: 900,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 706,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 520,
      settings: { slidesToShow: 1 }
    }
  ]
}
