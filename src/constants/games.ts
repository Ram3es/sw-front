// import dotaBg from '../../assets/img/top-bar/dota-bg.png'
// import dotaLogo from '../../assets/img/top-bar/dota-logo.png'
// import tf2Bg from '../../assets/img/top-bar/tf2-bg.png'
// import tf2Logo from '../../assets/img/top-bar/tf2-logo.svg'
import { ESteamAppId } from '../types/Inventory'

export const gamesLinks = [
  {
    name: 'CS:GO',
    bg: "/img/top-bar/csgo-bg.png",
    logo: "/img/top-bar/csgo-logo.svg",
    id: ESteamAppId.CSGO,
    description: 'The best knives, the coolest rifles, and many more skins!'
  }, {
    name: 'RUST',
    id: ESteamAppId.RUST,
    description: 'Some text'
  }
  // {
  //   name: 'Dota 2',
  //   bg: dotaBg,
  //   logo: dotaLogo,
  //   id: ESteamAppId.DOTA2,
  //   description: 'Awesome wearables, bundles, gems, and more!'
  // }, {
  //   name: 'Team Fortress 2',
  //   bg: tf2Bg,
  //   logo: tf2Logo,
  //   id: ESteamAppId.TF2,
  //   description: "Wearables! Armor! Weapons! We got'em all!"
  // }
]
