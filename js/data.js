/*
 * サイトコンテンツ定義（JSON配列を完全維持）
 * すべての繰り返しコンテンツはここで配列として管理し、main.js が描画する。
 */
const SITE_DATA = {
  brand: {
    name: "家づくりラボ",
    nameAccent: "ラボ",
    tagline: "理想のおうちをカタチに！"
  },

  nav: [
    { label: "家づくりの実例", dropdown: true,  href: "#examples" },
    { label: "コラム一覧",     dropdown: true,  href: "#column" },
    { label: "テーマまとめ",   dropdown: true,  href: "#nayami" },
    { label: "YouTube",        dropdown: false, href: "#youtube" }
  ],

  hero: {
    eyebrow: "ワクワクしながら、理想の家づくりへ",
    title: [
      { text: "家づくりで、", accent: false },
      { text: "後悔しない選択", accent: true },
      { text: "を。", accent: false }
    ],
    sub: "実例から学べる、家づくりの判断支援メディア。",
    primaryButton: "はじめての方へ（家づくりガイド）",
    secondaryButton: "理想の事例を探す",
    floatingCards: [
      { label: "間取り",   icon: "madori" },
      { label: "土地探し", icon: "tochi" },
      { label: "予算",     icon: "yosan" }
    ],
    guide: {
      title: "はじめての方へ",
      text: "家づくりの進め方を\nステップで解説！",
      button: "詳しく見る"
    }
  },

  nayami: {
    bubble: "家づくりのギモンを解決！",
    title: "悩みから探す",
    sub: "いまのあなたにピッタリのテーマを選んで、\n実例や記事をチェックしよう。",
    items: [
      { no: "01", icon: "house",   main: "これから家を建てたい",     sub: "何から始めればいい？\n進め方を知りたい方へ" },
      { no: "02", icon: "company", main: "会社選びで迷っている",     sub: "ハウスメーカー・工務店の\n違いや選び方を知りたい方へ" },
      { no: "03", icon: "plan",    main: "間取り・設備を決めている", sub: "間取りのコツや設備選びの\n実例を見たい方へ" },
      { no: "04", icon: "money",   main: "お金・ローンが不安",       sub: "資金計画や住宅ローンの\n不安を解消したい方へ" }
    ]
  },

  examples: {
    title: "注目の実例",
    sub: "実際に建てた人のリアルな実例をテーマ別にご紹介",
    moreButton: "実例・事例をもっと見る",
    featured: {
      badge: "注目の実例",
      title: "吹き抜けと大開口でつながる\n開放的なLDKの家",
      desc: "家族が自然と集まる心地よい空間。\n動線と収納にこだわった30坪の心地よい住まいです。",
      family: "夫婦+子ども２人",
      rating: "4.7",
      tags: ["吹き抜け", "大開口", "ウッドデッキ", "自然素材", "造作収納"],
      img: "images/example-room.png"
    },
    cards: [
      { title: "庭とつながる中庭のある平屋",            sub: "自然と家族が集まる心地よい平屋", area: "30.5坪", family: "夫婦+子ども２人", rating: "4.7", img: "images/example-room.png" },
      { title: "高断熱で一年中快適な\nシンプルモダンの家", sub: "冬も夏も快適な省エネ設定",       area: "30.5坪", family: "夫婦+子ども２人", rating: "4.7", img: "images/example-room.png" },
      { title: "庭とつながる中庭のある平屋",            sub: "自然と家族が集まる心地よい平屋", area: "30.5坪", family: "夫婦+子ども２人", rating: "4.7", img: "images/example-room.png" },
      { title: "庭とつながる中庭のある平屋",            sub: "自然と家族が集まる心地よい平屋", area: "30.5坪", family: "夫婦+子ども２人", rating: "4.7", img: "images/example-room.png" }
    ]
  },

  column: {
    title: "コラムから探す",
    sub: "家づくりの知識やコツ、役立つ情報をお届け！",
    button: "コラム一覧を見る",
    featured: {
      badge: "NEW",
      title: "理想の家を立てるために大切な\nはじめの一歩とは？",
      desc: "資金計画から土地の見つけ方まで、\n家づくりを始める前に知っておきたい\nポイントを分かりやすく解説します。",
      date: "2024-04-02",
      img: "images/column-photo.png"
    },
    items: [
      { title: "【実例10選】収納アイデアが光る家づくりの工夫", date: "2024-04-02", img: "images/column-photo.png" },
      { title: "【実例10選】収納アイデアが光る家づくりの工夫", date: "2024-04-02", img: "images/column-photo.png" }
    ]
  },

  youtube: {
    title: "最新のYouTube動画",
    sub: "家づくりのヒントが見つかる動画をチェック！",
    button: "YouTubeチャンネルを見る",
    featured: {
      badge: "PICK UP",
      title: "【実例12選】やっぱり買ってよかった！LDKの平屋ルームツアー",
      desc: "LDKを中心に、暮らしやすさの\n工夫が詰まった平屋をご紹介します",
      date: "2024-04-02",
      img: "images/youtube-photo.png"
    },
    items: [
      { title: "【実例10選】収納アイデアが光る家づくりの工夫", date: "2024-04-02", img: "images/column-photo.png" },
      { title: "【実例10選】収納アイデアが光る家づくりの工夫", date: "2024-04-02", img: "images/column-photo.png" }
    ]
  },

  footer: {
    social: ["youtube", "instagram", "line", "x"],
    nav: [
      { title: "記事を探す",   items: ["はじめての家づくり", "間取り・設備の選び方", "お金・資金計画", "会社・工務店の選び方", "ハウスメーカー比較"] },
      { title: "はじめての方へ", items: ["このサイトについて", "運営者情報", "プライバシーポリシー", "お問い合わせ"] },
      { title: "悩みから探す",   items: ["これから家を建てたい", "会社選びで迷っている", "間取り・設備を決めている", "お金・ローンが不安"] }
    ],
    sign: {
      title: "はじめての方へ",
      text: "家づくりの進め方を\nステップで解説！",
      button: "家づくりガイドを見る"
    },
    copyright: "©家づくりラボ All Rights Reserved"
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_DATA;
}
