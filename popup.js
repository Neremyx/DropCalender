// DropCalendar - Genshin Impact Talent Book Schedule
// Main popup script

class DropCalendar {
  constructor() {
    this.cacheKey = 'dropCalendar_data'
    this.lastUpdateKey = 'dropCalendar_lastUpdate'
    this.cacheExpiry = 24 * 60 * 60 * 1000 // 24 hours

    this.scheduleData = this.getDefaultSchedule()
    this.allCharacters = [] // For character search
    this.init()
  }

  async init() {
    await this.loadData()
    this.addSampleImages() // Add Game8.co images
    this.buildCharacterIndex()
    this.renderUI()
    this.setupEventListeners()
  }

  // Add Game8.co images for books and characters
  addSampleImages() {
    // Character image URLs from Game8.co CDN
    // Format: 'https://img.game8.co/[ID]/[HASH].png/show'
    // Used for educational/reference purposes only

    const sampleImages = {
      // All Genshin Impact characters with Game8.co image URLs

      // A-D Characters
      Albedo: 'https://img.game8.co/3310758/429ff8386dab8be2f4b1de43ac783f19.png/show', // ✅
      Alhaitham: 'https://img.game8.co/3630817/6fbf0ae4e0d39cb50b32097029c48809.png/show', // ✅
      Aloy: 'https://img.game8.co/3409689/af371b6f3782f11a72239d0b08b5a57a.png/show', // ✅
      Amber: 'https://img.game8.co/3294971/3c86f28546a768018df49960a15652bf.png/show', // ✅
      Arlecchino: 'https://img.game8.co/3870888/44d254ada42ac07c7ee236bea3acfec5.png/show', // ✅
      Ayaka: 'https://img.game8.co/3313080/2cae7dd671c21d14eff9fdd945e07da2.png/show', // ✅
      Ayato: 'https://img.game8.co/3507977/f539f685858f47fae42a57cf6bfbe634.png/show', // ✅
      Baizhu: 'https://img.game8.co/3680344/10439bfcec536c612f3e651c6aabf062.png/show', // ✅
      Barbara: 'https://img.game8.co/3294974/5e203f4ca8c30907bae5ad23432d6047.png/show', // ✅
      Beidou: 'https://img.game8.co/3294990/3269f50c780182e3fd1860d45189d742.png/show', // ✅
      Bennett: 'https://img.game8.co/3294999/853d5357be63f501a600fc776eb27256.png/show', // ✅
      Candace: 'https://img.game8.co/3587463/6912b3b078d6c049633204254e222933.png/show', // ✅
      Charlotte: 'https://img.game8.co/3790397/c99158be1533c758ba989cd4812f43df.png/show', // ✅
      Chasca: 'https://img.game8.co/4040818/a2c2a790a2750143ec1b3755fefcf859.png/show', // ✅
      Chevreuse: 'https://img.game8.co/3807127/7f6a7b74dc05eec7c0684c95ddc9d363.png/show', // ✅
      Chiori: 'https://img.game8.co/3852037/2fe63464f55b4b507b01e38a814aca2c.png/show', // ✅
      Chongyun: 'https://img.game8.co/3294995/fee596e42fda91cf32e9a7909a3d8f55.png/show', // ✅
      Citlali: 'https://img.game8.co/4073945/8da07f9a9eccf4127045ea0a388e635b.png/show', // ✅
      Clorinde: 'https://img.game8.co/3898505/981575e5aa20c7bcb8dd8feed9b8ded0.png/show', // ✅
      Collei: 'https://img.game8.co/3569484/b5dd2a24170529d1969d4f437e8bd568.png/show', // ✅
      Cyno: 'https://img.game8.co/3585290/20da32e3dcd31625b6e1b20a82a75204.png/show', // ✅
      Dahlia: 'https://img.game8.co/4197403/33023da1ddf8131b4fb2a5ea73a28a9d.png/show', // ✅
      Dehya: 'https://img.game8.co/3651457/3011ca0b44c5639817f86299f3f351a0.png/show', // ✅
      Diluc: 'https://img.game8.co/3294975/7a7f2b46d26c4458250f8fcaca0ca94c.png/show', // ✅
      Diona: 'https://img.game8.co/3295326/9d64a28761fd5a9b03234493b690cfde.png/show', // ✅
      Dori: 'https://img.game8.co/3573303/0037ca766d56b08f7d1fa40cf1a9c443.png/show', // ✅

      // E-K Characters
      Emilie: 'https://img.game8.co/3942957/1264d1d624b096cf2009568288231da8.png/show', // ✅
      Escoffier: 'https://img.game8.co/4164128/68e538731ffd8c4851af79299f52eb3d.png/show', // ✅
      Eula: 'https://img.game8.co/3357399/0681a143deeb28601cffa5fee727dd3d.png/show', // ✅
      Faruzan: 'https://img.game8.co/3620505/d2b99b93a237472b026f870e823e446b.png/show', // ✅
      Fischl: 'https://img.game8.co/3294982/edb5c8b98147514a9ce8d20888d689b6.png/show', // ✅
      Freminet: 'https://img.game8.co/3755935/c1d3d66360d8d740357f39f89c509739.png/show', // ✅
      Furina: 'https://img.game8.co/3790954/846f7e8888c6580354c236409f8a7f2f.png/show', // ✅
      Gaming: 'https://img.game8.co/3829280/b3ca9164ad2c934b7cb68eeeb50f2059.png/show', // ✅
      Ganyu: 'https://img.game8.co/3317298/8a6ff657aae195d782276029ad880c34.png/show', // ✅
      Gorou: 'https://img.game8.co/3459061/48a416f73b250dd32dc11092f63ce13d.png/show', // ✅
      Heizou: 'https://img.game8.co/3546223/98ea7f23e9af8bef07385f930ecd073c.png/show', // ✅
      'Hu Tao': 'https://img.game8.co/3332448/6a22c735ab5ab9db5cd251ecbf4ab2a4.png/show', // ✅
      Iansan: 'https://img.game8.co/4138520/0ed35caf60d92e1c2778e42dd36fee45.png/show', // ✅
      Ifa: 'https://img.game8.co/4164141/fc70c80e98ea2d08d73cb3451ebe0804.png/show', // ✅
      Itto: 'https://img.game8.co/3457893/4e1145280836f6e662e64ebb9a68e646.png/show', // ✅
      Jean: 'https://img.game8.co/3294970/8416650b93b606f33e2411387dabf550.png/show', // ✅
      Kachina: 'https://img.game8.co/3971307/7fffb03ad36f390012ef9cc0c63eedf9.png/show', // ✅
      Kaeya: 'https://img.game8.co/3294973/b2a3d5ca1d6d4cb47acedfa8a64375ca.png/show', // ✅
      Kaveh: 'https://img.game8.co/3681698/fad0a8213836388b08d0ec319c749d04.png/show', // ✅
      Kazuha: 'https://img.game8.co/3378026/242362114b92f3e00ee1d72355e6870f.png/show', // ✅
      Keqing: 'https://img.game8.co/3294997/b30e3834cd4ed13eb7c48dbca7d1d2f1.png/show', // ✅
      Kinich: 'https://img.game8.co/3988290/b40e5d6d77ac06fb29c717f28fe42f7f.png/show', // ✅
      Kirara: 'https://img.game8.co/3705922/0cc2a847fd314435beb8f91552eda62e.png/show', // ✅
      Klee: 'https://img.game8.co/3294978/e0194d396700c3add4ec1b95ddce41f0.png/show', // ✅
      Kokomi: 'https://img.game8.co/3418180/265e263d98a3461d6091e3cf69ca5fc9.png/show', // ✅

      // L-R Characters
      'Lan Yan': 'https://img.game8.co/4085060/13b6c8885432b5ae7e46d52e0551b031.png/show', // ✅
      Layla: 'https://img.game8.co/3608042/7f1131af47c7a0e776e9c3bcd08eecf7.png/show', // ✅
      Lisa: 'https://img.game8.co/3294972/ee211ef041897cd2f129ef320e21a9f0.png/show', // ✅
      Lynette: 'https://img.game8.co/3751436/340282c533aed31bda827b4a5d9fab5b.png/show', // ✅
      Lyney: 'https://img.game8.co/3751446/9502093747d4107a0350124db0fabed9.png/show', // ✅
      Mavuika: 'https://img.game8.co/4073955/c4891728ca78e76e1590692b80a3f9cc.png/show', // ✅
      Mika: 'https://img.game8.co/3662046/34c5273e49bbcc42fcd0c2e29522bd3b.png/show', // ✅
      Mizuki: 'https://img.game8.co/4105295/29f021a00aea06bd41b2e2266c6fe00a.png/show', // ✅
      Mona: 'https://img.game8.co/3294986/edda48bf6a0908f1f00fe3211da8fd09.png/show', // ✅
      Mualani: 'https://img.game8.co/3971306/9a08a3efd8ed993c4397e0cce89545ed.png/show', // ✅
      Nahida: 'https://img.game8.co/3604130/3e6db61ed6d732571e783aefb6280738.png/show', // ✅
      Navia: 'https://img.game8.co/3807141/f03829475fd9cf9bfe183b550b572ed5.png/show', // ✅
      Neuvillette: 'https://img.game8.co/3767456/67375a9dd425cccecf66145b20bad7be.png/show', // ✅
      Nilou: 'https://img.game8.co/3593591/8a7ec44c7177f2dcf18aaf4ee6f7075d.png/show', // ✅
      Ningguang: 'https://img.game8.co/3294992/4409701c15b04ff1a597817eb2883544.png/show', // ✅
      Noelle: 'https://img.game8.co/3295000/c61fa6632aeb5564203541e9c59f15f1.png/show', // ✅
      Ororon: 'https://img.game8.co/4043774/b27342109c0c0bc875632bf238473ffd.png/show', // ✅
      Qiqi: 'https://img.game8.co/3294996/af8d32be60362056ffcfd333e1fab761.png/show', // ✅
      Raiden: 'https://img.game8.co/3409293/af58e7854a4e7f7d1d857c5a79db2ce6.png/show', // ✅
      Razor: 'https://img.game8.co/3294976/698d06f42b22301950f6eeda34cc9a37.png/show', // ✅
      Rosaria: 'https://img.game8.co/3341649/5d22208b443b074dfb35fdf393c8d62f.png/show', // ✅

      // S-Z Characters
      Sara: 'https://img.game8.co/3410417/af76885ff6366f245127fb47105dda8d.png/show', // ✅
      Sayu: 'https://img.game8.co/3401060/f6cef4da3d573ae064d253cf8bee1448.png/show', // ✅
      Sethos: 'https://img.game8.co/3900705/b1d42851e4e0c745e756d96104a31455.png/show', // ✅
      Shenhe: 'https://img.game8.co/3464005/859f936652b000ce75ac5d0921e4d095.png/show', // ✅
      Shinobu: 'https://img.game8.co/3539169/6dc2b1ce3d5bb8fe449d38c4416b2de4.png/show', // ✅
      Sigewinne: 'https://img.game8.co/3911319/73129fd543444e3c4c41a64734ec0e3e.png/show', // ✅
      Skirk: 'https://img.game8.co/4194956/7a1921a73270a143aa6ee416e3dd40fe.png/show', // ✅
      Sucrose: 'https://img.game8.co/3294983/a87fb8809f1abed3f0f01cb17cc6e791.png/show', // ✅
      Tartaglia: 'https://img.game8.co/3295009/47a42db3c2736ef309028ccbd3cfb5cf.png/show', // ✅
      Thoma: 'https://img.game8.co/3441106/99ed64ada8d15708869cd60643a8044f.png/show', // ✅
      Tighnari: 'https://img.game8.co/3569489/d290902f70d4c5e479c56286ee9a7b24.png/show', // ✅
      'Traveler (Anemo)': 'https://img.game8.co/3951444/77bf0f9b4d7add4544b2842571dafff0.png/show', // ✅
      'Traveler (Dendro)': 'https://img.game8.co/3951446/8cfd19bccc70f8dad32356ea7b58d52a.png/show', // ✅
      'Traveler (Electro)':
        'https://img.game8.co/3951447/5e47ae06ab6b01c67e15f2cff36a3cb8.png/show', // ✅
      'Traveler (Geo)': 'https://img.game8.co/3951449/f7f5a49dada5bb84175e0373f737ea56.png/show', // ✅
      'Traveler (Hydro)': 'https://img.game8.co/3951451/171b616bab2df3f8a6e4189dc98362e5.png/show', // ✅
      'Traveler (Pyro)': 'https://img.game8.co/3972370/a7e9dfe5dc74d8ce9f7fba757681b090.png/show', // ✅
      Varesa: 'https://img.game8.co/4134897/c7e57067732cb12a208d41bc5c7f1bf3.png/show', // ✅
      Venti: 'https://img.game8.co/3294977/da7d112f0f9c44f8d123cc533a3317a8.png/show', // ✅
      Wanderer: 'https://img.game8.co/3619988/99ba4ee9abf0e4a88d54da22b63455ee.png/show', // ✅
      Wriothesley: 'https://img.game8.co/3779251/c65fdf738be54035d45a1b3f04d0e7bd.png/show', // ✅
      Xiangling: 'https://img.game8.co/3294993/cade13884333f5388bf84bfb14f08deb.png/show', // ✅
      Xianyun: 'https://img.game8.co/3826176/83048fb14dda592d1f61fad32a309635.png/show', // ✅
      Xiao: 'https://img.game8.co/3294989/397b1e9b2effcd2ec2dabbbc1ff6a068.png/show', // ✅
      Xilonen: 'https://img.game8.co/4006625/68773fb0277285f242c5b7fa4d2c28e8.png/show', // ✅
      Xingqiu: 'https://img.game8.co/3294994/78be634e3a6f78d37e12b16e572762ef.png/show', // ✅
      Xinyan: 'https://img.game8.co/3301616/50f3ae6dfc1a4aa34d9a80d1aef95027.png/show', // ✅
      'Yae Miko': 'https://img.game8.co/3485121/17912d280f92eb096f2fc019d6292b98.png/show', // ✅
      Yanfei: 'https://img.game8.co/3350233/8170b6a6fce6e95b547a16859c3a562e.png/show', // ✅
      Yaoyao: 'https://img.game8.co/3631989/4e208c53d605cb7c8bd407e7a96aceb7.png/show', // ✅
      Yelan: 'https://img.game8.co/3530017/258a68ae18705bbd1d276f65c2e94c27.png/show', // ✅
      Yoimiya: 'https://img.game8.co/3400792/b31e528518dfa732ab0f3e184ac364d3.png/show', // ✅
      'Yun Jin': 'https://img.game8.co/3464066/a91b8fd45ad7f259088746352eede482.png/show', // ✅
      Zhongli: 'https://img.game8.co/3300497/33da5700d1749ceecbea9369809c706d.png/show', // ✅
    }

    // Game8.co talent book image URLs - Real URLs from Game8.co
    // ✅ = Real URL verified from Game8.co extraction
    const bookImages = {
      // Mondstadt Books - Philosophies (highest tier)
      Freedom: 'https://img.game8.co/3316478/645a4712c66fa6a7c9c49b38989262f7.png/show', // ✅ Philosophies of Freedom
      Resistance: 'https://img.game8.co/3316480/a51c1c52097aeedd693eb55003dc4ff8.png/show', // ✅ Philosophies of Resistance
      Ballad: 'https://img.game8.co/3316473/0cc47ab522a4306a4858a691ce8256aa.png/show', // ✅ Philosophies of Ballad

      // Liyue Books - Philosophies (highest tier)
      Prosperity: 'https://img.game8.co/3316476/8011420ff4f21942fc4639dadac86e01.png/show', // ✅ Philosophies of Prosperity
      Diligence: 'https://img.game8.co/3316472/1321df67f82b6292da7e48e537535f54.png/show', // ✅ Philosophies of Diligence
      Gold: 'https://img.game8.co/3316479/f5b4e6eda717cdd9f0a35eb4aca2027c.png/show', // ✅ Philosophies of Gold

      // Inazuma Books - Philosophies (highest tier)
      Transience: 'https://img.game8.co/3390464/5c8b60ef1a6a39ad8b97e1bf86214d7e.png/show', // ✅ Philosophies of Transience
      Elegance: 'https://img.game8.co/3390468/e379db4c1eb20a98e63ead12cf5f8b21.png/show', // ✅ Philosophies of Elegance
      Light: 'https://img.game8.co/3390465/5e914d8dbefb216868644956f837b582.png/show', // ✅ Philosophies of Light

      // Sumeru Books - Philosophies (highest tier)
      Admonition: 'https://img.game8.co/3566896/7c3a9a6394d73925c2dbe966437e4d54.png/show', // ✅ Philosophies of Admonition
      Ingenuity: 'https://img.game8.co/3566895/d9669252ae4424ea6f14bc2bcf1f94b4.png/show', // ✅ Philosophies of Ingenuity
      Praxis: 'https://img.game8.co/3914154/d20695c9524c2bf77e72ef80a6741b42.png/show', // ✅ Philosophies of Praxis

      // Fontaine Books - Philosophies (highest tier)
      Equity: 'https://img.game8.co/3750662/7caa359ca74a1c7248ca10edfb3f152a.png/show', // ✅ Philosophies of Equity
      Justice: 'https://img.game8.co/3750666/9ce0629f1bb659ae3ce221ac529a5939.png/show', // ✅ Philosophies of Justice
      Order: 'https://img.game8.co/3750676/39db7571dbfec9eca67b9eee31dcd209.png/show', // ✅ Philosophies of Order

      // Natlan Books - Philosophies (highest tier)
      Contention: 'https://img.game8.co/3970680/0f69da26d032d3c15058581af48d9407.png/show', // ✅ Philosophies of Contention
      Kindling: 'https://img.game8.co/3970678/7eae0076271eddc1aaf6a36483e391be.png/show', // ✅ Philosophies of Kindling
      Conflict: 'https://img.game8.co/3970681/4419de54af72edf0f9d78d9867f78fe6.png/show', // ✅ Philosophies of Conflict
    }

    // Update books with images
    Object.keys(this.scheduleData).forEach(day => {
      if (day !== 'sunday') {
        this.scheduleData[day].forEach(book => {
          // Add book image if available
          if (bookImages[book.name]) {
            book.image = bookImages[book.name]
          }

          // Convert characters to object format with avatars
          if (book.characters && Array.isArray(book.characters)) {
            book.characters = book.characters.map(character => {
              if (typeof character === 'string') {
                return {
                  name: character,
                  avatar: sampleImages[character] || null,
                }
              }
              return character // Already an object
            })
          }
        })
      }
    })
  }

  getDefaultSchedule() {
    return {
      // Weekly rotation schedule based on Game8 data
      monday: [
        {
          name: 'Freedom',
          region: 'Mondstadt',
          characters: [
            'Traveler (Anemo)',
            'Traveler (Geo)',
            'Amber',
            'Barbara',
            'Klee',
            'Sucrose',
            'Tartaglia',
            'Diona',
            'Aloy',
          ],
        },
        {
          name: 'Prosperity',
          region: 'Liyue',
          characters: [
            'Traveler (Geo)',
            'Xiao',
            'Ningguang',
            'Qiqi',
            'Keqing',
            'Shenhe',
            'Yelan',
            'Gaming',
          ],
        },
        {
          name: 'Transience',
          region: 'Inazuma',
          characters: [
            'Yoimiya',
            'Thoma',
            'Traveler (Electro)',
            'Kokomi',
            'Heizou',
            'Kirara',
            'Mizuki',
          ],
        },
        {
          name: 'Admonition',
          region: 'Sumeru',
          characters: ['Cyno', 'Traveler (Dendro)', 'Tighnari', 'Candace', 'Faruzan'],
        },
        {
          name: 'Equity',
          region: 'Fontaine',
          characters: ['Lyney', 'Traveler (Hydro)', 'Navia', 'Sigewinne', 'Neuvillette'],
        },
        {
          name: 'Contention',
          region: 'Natlan',
          characters: ['Skirk', 'Iansan', 'Mualani', 'Mavuika', 'Traveler (Pyro)'],
        },
      ],
      tuesday: [
        {
          name: 'Resistance',
          region: 'Mondstadt',
          characters: [
            'Traveler (Anemo)',
            'Traveler (Geo)',
            'Jean',
            'Diluc',
            'Razor',
            'Bennett',
            'Noelle',
            'Mona',
            'Eula',
          ],
        },
        {
          name: 'Diligence',
          region: 'Liyue',
          characters: [
            'Traveler (Geo)',
            'Xiangling',
            'Chongyun',
            'Ganyu',
            'Hu Tao',
            'Kazuha',
            'Yun Jin',
            'Yaoyao',
            'Lan Yan',
          ],
        },
        {
          name: 'Elegance',
          region: 'Inazuma',
          characters: ['Ayaka', 'Sara', 'Itto', 'Ayato', 'Shinobu'],
        },
        {
          name: 'Ingenuity',
          region: 'Sumeru',
          characters: ['Traveler (Dendro)', 'Dori', 'Alhaitham', 'Nahida', 'Kaveh', 'Layla'],
        },
        {
          name: 'Justice',
          region: 'Fontaine',
          characters: [
            'Charlotte',
            'Traveler (Hydro)',
            'Freminet',
            'Furina',
            'Clorinde',
            'Escoffier',
          ],
        },
        {
          name: 'Kindling',
          region: 'Natlan',
          characters: ['Kinich', 'Citlali', 'Xilonen', 'Ororon', 'Traveler (Pyro)'],
        },
      ],
      wednesday: [
        {
          name: 'Ballad',
          region: 'Mondstadt',
          characters: [
            'Traveler (Anemo)',
            'Traveler (Geo)',
            'Lisa',
            'Kaeya',
            'Venti',
            'Fischl',
            'Albedo',
            'Rosaria',
            'Mika',
            'Dahlia',
          ],
        },
        {
          name: 'Gold',
          region: 'Liyue',
          characters: [
            'Traveler (Geo)',
            'Beidou',
            'Xingqiu',
            'Zhongli',
            'Xinyan',
            'Yanfei',
            'Baizhu',
            'Xianyun',
          ],
        },
        {
          name: 'Light',
          region: 'Inazuma',
          characters: ['Yae Miko', 'Sayu', 'Gorou', 'Raiden', 'Traveler (Electro)', 'Chiori'],
        },
        {
          name: 'Praxis',
          region: 'Sumeru',
          characters: ['Wanderer', 'Traveler (Dendro)', 'Collei', 'Dehya', 'Nilou', 'Sethos'],
        },
        {
          name: 'Order',
          region: 'Fontaine',
          characters: [
            'Lynette',
            'Arlecchino',
            'Traveler (Hydro)',
            'Wriothesley',
            'Emilie',
            'Chevreuse',
          ],
        },
        {
          name: 'Conflict',
          region: 'Natlan',
          characters: ['Kachina', 'Chasca', 'Traveler (Pyro)', 'Ifa', 'Varesa'],
        },
      ],
      thursday: [
        {
          name: 'Freedom',
          region: 'Mondstadt',
          characters: [
            'Traveler (Anemo)',
            'Traveler (Geo)',
            'Amber',
            'Barbara',
            'Klee',
            'Sucrose',
            'Tartaglia',
            'Diona',
            'Aloy',
          ],
        },
        {
          name: 'Prosperity',
          region: 'Liyue',
          characters: [
            'Traveler (Geo)',
            'Xiao',
            'Ningguang',
            'Qiqi',
            'Keqing',
            'Shenhe',
            'Yelan',
            'Gaming',
          ],
        },
        {
          name: 'Transience',
          region: 'Inazuma',
          characters: [
            'Yoimiya',
            'Thoma',
            'Traveler (Electro)',
            'Kokomi',
            'Heizou',
            'Kirara',
            'Mizuki',
          ],
        },
        {
          name: 'Admonition',
          region: 'Sumeru',
          characters: ['Cyno', 'Traveler (Dendro)', 'Tighnari', 'Candace', 'Faruzan'],
        },
        {
          name: 'Equity',
          region: 'Fontaine',
          characters: ['Lyney', 'Traveler (Hydro)', 'Navia', 'Sigewinne', 'Neuvillette'],
        },
        {
          name: 'Contention',
          region: 'Natlan',
          characters: ['Skirk', 'Iansan', 'Mualani', 'Mavuika', 'Traveler (Pyro)'],
        },
      ],
      friday: [
        {
          name: 'Resistance',
          region: 'Mondstadt',
          characters: [
            'Traveler (Anemo)',
            'Traveler (Geo)',
            'Jean',
            'Diluc',
            'Razor',
            'Bennett',
            'Noelle',
            'Mona',
            'Eula',
          ],
        },
        {
          name: 'Diligence',
          region: 'Liyue',
          characters: [
            'Traveler (Geo)',
            'Xiangling',
            'Chongyun',
            'Ganyu',
            'Hu Tao',
            'Kazuha',
            'Yun Jin',
            'Yaoyao',
            'Lan Yan',
          ],
        },
        {
          name: 'Elegance',
          region: 'Inazuma',
          characters: ['Ayaka', 'Sara', 'Itto', 'Ayato', 'Shinobu'],
        },
        {
          name: 'Ingenuity',
          region: 'Sumeru',
          characters: ['Traveler (Dendro)', 'Dori', 'Alhaitham', 'Nahida', 'Kaveh', 'Layla'],
        },
        {
          name: 'Justice',
          region: 'Fontaine',
          characters: [
            'Charlotte',
            'Traveler (Hydro)',
            'Freminet',
            'Furina',
            'Clorinde',
            'Escoffier',
          ],
        },
        {
          name: 'Kindling',
          region: 'Natlan',
          characters: ['Kinich', 'Citlali', 'Xilonen', 'Ororon', 'Traveler (Pyro)'],
        },
      ],
      saturday: [
        {
          name: 'Ballad',
          region: 'Mondstadt',
          characters: [
            'Traveler (Anemo)',
            'Traveler (Geo)',
            'Lisa',
            'Kaeya',
            'Venti',
            'Fischl',
            'Albedo',
            'Rosaria',
            'Mika',
            'Dahlia',
          ],
        },
        {
          name: 'Gold',
          region: 'Liyue',
          characters: [
            'Traveler (Geo)',
            'Beidou',
            'Xingqiu',
            'Zhongli',
            'Xinyan',
            'Yanfei',
            'Baizhu',
            'Xianyun',
          ],
        },
        {
          name: 'Light',
          region: 'Inazuma',
          characters: ['Yae Miko', 'Sayu', 'Gorou', 'Raiden', 'Traveler (Electro)', 'Chiori'],
        },
        {
          name: 'Praxis',
          region: 'Sumeru',
          characters: ['Wanderer', 'Traveler (Dendro)', 'Collei', 'Dehya', 'Nilou', 'Sethos'],
        },
        {
          name: 'Order',
          region: 'Fontaine',
          characters: [
            'Lynette',
            'Arlecchino',
            'Traveler (Hydro)',
            'Wriothesley',
            'Emilie',
            'Chevreuse',
          ],
        },
        {
          name: 'Conflict',
          region: 'Natlan',
          characters: ['Kachina', 'Chasca', 'Traveler (Pyro)', 'Ifa', 'Varesa'],
        },
      ],
      sunday: [], // All books available
    }
  }

  // Build character index for search functionality
  buildCharacterIndex() {
    this.allCharacters = []

    Object.keys(this.scheduleData).forEach(day => {
      if (day !== 'sunday') {
        this.scheduleData[day].forEach(book => {
          if (book.characters) {
            book.characters.forEach(character => {
              // Handle both string and object format
              const charName = typeof character === 'string' ? character : character.name
              const charAvatar = typeof character === 'object' ? character.avatar : null

              // Avoid duplicates
              if (!this.allCharacters.find(c => c.name === charName)) {
                this.allCharacters.push({
                  name: charName,
                  avatar: charAvatar,
                  book: book.name,
                  region: book.region,
                  day: day,
                })
              }
            })
          }
        })
      }
    })
  }

  // Fuzzy matching algorithm for character search
  fuzzyMatch(pattern, text) {
    pattern = pattern.toLowerCase()
    text = text.toLowerCase()

    let patternIdx = 0
    let score = 0
    let consecutiveMatches = 0

    for (let i = 0; i < text.length; i++) {
      if (patternIdx < pattern.length && text[i] === pattern[patternIdx]) {
        patternIdx++
        consecutiveMatches++
        score += consecutiveMatches * 10 // Bonus for consecutive matches
      } else {
        consecutiveMatches = 0
      }
    }

    if (patternIdx === pattern.length) {
      // Bonus for exact match at start
      if (text.startsWith(pattern)) {
        score += 100
      }
      // Penalty for length difference
      score -= Math.abs(text.length - pattern.length)
      return score
    }

    return 0 // No match
  }

  // Search characters with fuzzy matching
  searchCharacters(query) {
    if (!query || query.length < 2) {
      return []
    }

    const currentDay = this.getCurrentDay()
    const todaysBooks = this.getTodaysBooks()
    const todayBookNames = todaysBooks.map(book => book.name)

    const results = this.allCharacters
      .map(character => {
        // Check if character can be farmed today
        const canFarmToday = currentDay === 'sunday' || todayBookNames.includes(character.book)

        // Get the days when this character can be farmed
        const farmableDays = this.getCharacterFarmableDays(character.book)

        return {
          ...character,
          score: this.fuzzyMatch(query, character.name),
          canFarmToday: canFarmToday,
          farmableDays: farmableDays,
        }
      })
      .filter(character => character.score > 0)
      .sort((a, b) => {
        // Sort by farmable today first, then by score
        if (a.canFarmToday && !b.canFarmToday) return -1
        if (!a.canFarmToday && b.canFarmToday) return 1
        return b.score - a.score
      })
      .slice(0, 8) // Limit to 8 results

    return results
  }

  // Get the days when a specific talent book can be farmed
  getCharacterFarmableDays(bookName) {
    const farmableDays = []

    Object.keys(this.scheduleData).forEach(day => {
      if (day !== 'sunday') {
        const dayBooks = this.scheduleData[day].map(book => book.name)
        if (dayBooks.includes(bookName)) {
          farmableDays.push(day)
        }
      }
    })

    // Add Sunday (all books available)
    farmableDays.push('sunday')

    return farmableDays
  }

  // Convert day key to display name
  getDayDisplayName(dayKey) {
    const dayNames = {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    }
    return dayNames[dayKey] || dayKey
  }

  async loadData() {
    try {
      // Check if cached data is still valid
      const result = await chrome.storage.local.get([this.cacheKey, this.lastUpdateKey])
      const lastUpdate = result[this.lastUpdateKey] || 0
      const now = Date.now()

      if (result[this.cacheKey] && now - lastUpdate < this.cacheExpiry) {
        // Use cached data only if it has the expected structure
        const cachedData = result[this.cacheKey]
        if (
          cachedData &&
          typeof cachedData === 'object' &&
          cachedData.monday &&
          cachedData.tuesday
        ) {
          this.scheduleData = cachedData
          console.log('Using cached data')
          return
        }
      }

      // Try to fetch fresh data or ensure we have default data
      await this.fetchFreshData()
    } catch (error) {
      console.error('Error loading data:', error)
      // Make sure we always have default data even if there's an error
      if (!this.scheduleData || !this.scheduleData.monday) {
        this.scheduleData = this.getDefaultSchedule()
      }
    }
  }

  async fetchFreshData() {
    try {
      // Always use the default schedule data (manual updates)
      console.log('Using default schedule data')

      // Ensure we have the default schedule data
      if (!this.scheduleData || !this.scheduleData.monday) {
        this.scheduleData = this.getDefaultSchedule()
      }

      // Cache the data
      await chrome.storage.local.set({
        [this.cacheKey]: this.scheduleData,
        [this.lastUpdateKey]: Date.now(),
      })
    } catch (error) {
      console.error('Error caching data:', error)
      // Ensure we have default data
      if (!this.scheduleData || !this.scheduleData.monday) {
        this.scheduleData = this.getDefaultSchedule()
      }
      throw error
    }
  }

  getCurrentDay() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const today = new Date()
    return days[today.getDay()]
  }

  getCurrentDayName() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    return days[today.getDay()]
  }

  getTodaysBooks() {
    const currentDay = this.getCurrentDay()

    if (currentDay === 'sunday') {
      // All books available on Sunday
      return this.getAllBooks()
    }

    return this.scheduleData[currentDay] || []
  }

  getAllBooks() {
    // Return all unique books from all days
    const allBooks = []
    const bookNames = new Set()

    Object.keys(this.scheduleData).forEach(day => {
      if (day !== 'sunday') {
        this.scheduleData[day].forEach(book => {
          if (!bookNames.has(book.name)) {
            bookNames.add(book.name)
            allBooks.push(book)
          }
        })
      }
    })

    return allBooks
  }

  renderUI() {
    this.hideLoading()
    this.showContent()

    // Update day display
    const dayElement = document.getElementById('current-day')
    dayElement.textContent = this.getCurrentDayName()

    // Update last updated time
    this.updateLastUpdatedTime()

    // Render books
    this.renderBooks()
  }

  async updateLastUpdatedTime() {
    try {
      const result = await chrome.storage.local.get([this.lastUpdateKey])
      const lastUpdate = result[this.lastUpdateKey]
      const lastUpdatedElement = document.getElementById('last-updated')

      if (lastUpdate) {
        const date = new Date(lastUpdate)
        const dateString = date.toLocaleDateString([], { 
          month: 'short', 
          day: 'numeric' 
        })
        const timeString = date.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
        lastUpdatedElement.textContent = `Last updated: ${dateString} ${timeString}`
      } else {
        lastUpdatedElement.textContent = 'Last updated: Never'
      }
    } catch (error) {
      console.error('Error getting last update time:', error)
    }
  }

  renderBooks() {
    const container = document.getElementById('books-container')
    const todaysBooks = this.getTodaysBooks()
    const currentDay = this.getCurrentDay()

    container.innerHTML = ''

    if (currentDay === 'sunday') {
      // Show Sunday note
      document.querySelector('.sunday-note').style.display = 'block'
    } else {
      document.querySelector('.sunday-note').style.display = 'none'
    }

    if (todaysBooks.length === 0) {
      container.innerHTML = '<p class="no-books">No books available today.</p>'
      return
    }

    todaysBooks.forEach(book => {
      const bookCard = this.createBookCard(book)
      container.appendChild(bookCard)
    })

    // Set up image error handlers after DOM insertion
    this.setupImageErrorHandlers()
  }

  // Handle image loading errors with proper event listeners (CSP compliant)
  setupImageErrorHandlers() {
    // Handle character avatar errors
    document.querySelectorAll('.character-avatar[data-error-fallback="hide"]').forEach(img => {
      img.addEventListener('error', function () {
        this.style.display = 'none'
      })
    })

    // Handle search avatar errors
    document
      .querySelectorAll('.character-search-avatar[data-error-fallback="hide"]')
      .forEach(img => {
        img.addEventListener('error', function () {
          this.style.display = 'none'
        })
      })

    // Handle book image errors
    document.querySelectorAll('.book-image[data-error-fallback="icon"]').forEach(img => {
      img.addEventListener('error', event => {
        const bookName = event.target.getAttribute('data-book-name')
        const fallbackIcon = this.getBookIconFallback(bookName)
        event.target.parentElement.innerHTML = fallbackIcon
      })
    })
  }

  createBookCard(book) {
    const card = document.createElement('div')
    card.className = 'book-card'

    const bookIcon = this.getBookIcon(book.name, book.image)

    card.innerHTML = `
            <div class="book-header">
                <div class="book-icon">${bookIcon}</div>
                <div class="book-info">
                    <h3>${book.name}</h3>
                    <div class="book-region">${book.region}</div>
                </div>
            </div>
            <div class="characters-list">
                ${this.renderCharacterTags(book.characters)}
            </div>
        `

    return card
  }

  renderCharacterTags(characters) {
    return characters
      .map(character => {
        // Handle both string and object format
        const charName = typeof character === 'string' ? character : character.name
        const charAvatar = typeof character === 'object' ? character.avatar : null

        return `<span class="character-tag">
        ${
          charAvatar
            ? `<img src="${charAvatar}" alt="${charName}" class="character-avatar" data-error-fallback="hide">`
            : ''
        }
        <span class="character-name">${charName}</span>
      </span>`
      })
      .join('')
  }

  getBookIcon(bookName, bookImage = null) {
    if (bookImage) {
      return `<img src="${bookImage}" alt="${bookName}" class="book-image" data-error-fallback="icon" data-book-name="${bookName}" />`
    }

    return this.getBookIconFallback(bookName)
  }

  getBookIconFallback(bookName) {
    const icons = {
      Freedom: 'FR',
      Resistance: 'RE',
      Ballad: 'BA',
      Prosperity: 'PR',
      Diligence: 'DI',
      Gold: 'GO',
      Transience: 'TR',
      Elegance: 'EL',
      Light: 'LI',
      Admonition: 'AD',
      Ingenuity: 'IN',
      Praxis: 'PX',
      Equity: 'EQ',
      Justice: 'JU',
      Order: 'OR',
      Contention: 'CO',
      Kindling: 'KI',
      Conflict: 'CF',
    }

    return icons[bookName] || bookName.substring(0, 2).toUpperCase()
  }

  setupEventListeners() {
    const refreshBtn = document.getElementById('refresh-btn')
    refreshBtn.addEventListener('click', () => this.handleRefresh())

    // Event listeners for search functionality
    const searchInput = document.getElementById('character-search')
    const clearBtn = document.getElementById('clear-search')
    const searchResults = document.getElementById('search-results')

    searchInput.addEventListener('input', e => {
      const query = e.target.value.trim()

      if (query.length >= 2) {
        const results = this.searchCharacters(query)
        this.displaySearchResults(results)
        clearBtn.classList.remove('hidden')
      } else {
        searchResults.classList.add('hidden')
        clearBtn.classList.add('hidden')
      }
    })

    clearBtn.addEventListener('click', () => {
      searchInput.value = ''
      searchResults.classList.add('hidden')
      clearBtn.classList.add('hidden')
      searchInput.focus()
    })

    // Close results when clicking outside
    document.addEventListener('click', e => {
      if (!e.target.closest('.search-container')) {
        searchResults.classList.add('hidden')
      }
    })
  }

  displaySearchResults(results) {
    const searchResults = document.getElementById('search-results')

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">No characters found</div>'
    } else {
      searchResults.innerHTML = results
        .map(character => {
          // Get next farmable day if not farmable today
          let farmingMessage = ''
          if (!character.canFarmToday) {
            const nextFarmableDays = character.farmableDays
              .filter(day => day !== 'sunday')
              .map(day => this.getDayDisplayName(day))
              .join(', ')

            farmingMessage = `
              <div class="farming-notice">
                <i class="fas fa-calendar-times"></i>
                Cannot farm today. Available on: ${nextFarmableDays}, Sunday
              </div>
            `
          } else {
            farmingMessage = `
              <div class="farming-available">
                <i class="fas fa-check-circle"></i>
                Can farm today!
              </div>
            `
          }

          return `
            <div class="search-result-item ${
              character.canFarmToday ? 'farmable-today' : 'not-farmable-today'
            }" data-character="${character.name}">
              ${
                character.avatar
                  ? `<img src="${character.avatar}" alt="${character.name}" class="character-search-avatar" data-error-fallback="hide">`
                  : `<div class="character-search-avatar" style="background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">${character.name.substring(
                      0,
                      2
                    )}</div>`
              }
              <div class="character-search-info">
                <div class="character-search-name">${character.name}</div>
                <div class="character-search-book">${character.book} - ${character.region}</div>
                ${farmingMessage}
              </div>
            </div>
          `
        })
        .join('')

      // Add event listeners to search results
      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const characterName = item.dataset.character
          this.highlightCharacter(characterName)
          searchResults.classList.add('hidden')
        })
      })

      // Set up image error handlers for search results
      this.setupImageErrorHandlers()
    }

    searchResults.classList.remove('hidden')
  }

  highlightCharacter(characterName) {
    // Remove previous highlights
    document.querySelectorAll('.character-tag.highlighted').forEach(tag => {
      tag.classList.remove('highlighted')
    })

    // Highlight the found character
    document.querySelectorAll('.character-tag').forEach(tag => {
      if (tag.textContent.trim() === characterName) {
        tag.classList.add('highlighted')
        tag.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }

  async handleRefresh() {
    const refreshBtn = document.getElementById('refresh-btn')
    refreshBtn.classList.add('spinning')

    try {
      // Clear cache and fetch fresh data
      await chrome.storage.local.remove([this.cacheKey, this.lastUpdateKey])

      // Reset to default schedule first
      this.scheduleData = this.getDefaultSchedule()

      await this.fetchFreshData()
      this.addSampleImages() // Re-add images after refresh
      this.buildCharacterIndex() // Rebuild index
      this.updateLastUpdatedTime()
      this.renderBooks()
    } catch (error) {
      console.error('Error refreshing data:', error)
      // Ensure we have default data even if refresh fails
      this.scheduleData = this.getDefaultSchedule()
      this.buildCharacterIndex()
      this.renderBooks()
      this.showError()
    } finally {
      refreshBtn.classList.remove('spinning')
    }
  }

  hideLoading() {
    document.getElementById('loading').classList.add('hidden')
  }

  showContent() {
    document.getElementById('content').classList.remove('hidden')
  }

  showError() {
    document.getElementById('error').classList.remove('hidden')
    setTimeout(() => {
      document.getElementById('error').classList.add('hidden')
    }, 5000)
  }
}

// Initialize the extension when the popup opens
document.addEventListener('DOMContentLoaded', () => {
  new DropCalendar()
})
