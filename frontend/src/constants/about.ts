import album1 from "/public/photo/album/1.jpg";
import album2 from "/public/photo/album/2.jpg";
import album3 from "/public/photo/album/3.jpg";
import album4 from "/public/photo/album/4.jpg";
import album5 from "/public/photo/album/5.jpg";
import album6 from "/public/photo/album/6.jpg";
import album7 from "/public/photo/album/7.webp";
import album8 from "/public/photo/album/8.webp";
import album9 from "/public/photo/album/9.jpg";
import album10 from "/public/photo/album/10.jpg";
import album11 from "/public/photo/album/11.jpg";
import album12 from "/public/photo/album/12.webp";
import album13 from "/public/photo/album/13.webp";
import { StaticImageData } from "next/image";

interface MusicType {
  title: string;
  subtitle: string;
  album: StaticImageData;
  url: string;
}

type MusicListType = MusicType[];

export const MUSIC_LIST: MusicListType = [
  {
    title: "입춘",
    subtitle: "디지털 싱글",
    album: album1,
    url: "https://www.youtube.com/watch?v=pNi9PjmbUrI",
  },
  {
    title: "거울",
    subtitle: "디지털 싱글",
    album: album2,
    url: "https://www.youtube.com/watch?v=OV668xgCau8",
  },
  {
    title: "비틀비틀 짝짜꿍",
    subtitle: "디지털 싱글",
    album: album3,
    url: "https://www.youtube.com/watch?v=XBiMV9kVhwQ",
  },
  {
    title: "정류장",
    subtitle: "디지털 싱글",
    album: album4,
    url: "https://www.youtube.com/watch?v=2EMgY5E5Ook",
  },
  {
    title: "자처",
    subtitle: "디지털 싱글",
    album: album5,
    url: "https://www.youtube.com/watch?v=JyoltvsJ9Fw",
  },
  {
    title: "이상비행",
    subtitle: "EP",
    album: album6,
    url: "https://www.youtube.com/watch?v=yXDraJ33aLM&t=601s",
  },
];
export const DISCOGRAPHY_LIST: MusicListType = [
  {
    title: "그런 날",
    subtitle: "작사 첨여",
    album: album7,
    url: "https://www.youtube.com/watch?v=8SSTQDQu6mI",
  },
  {
    title: "다이아몬드",
    subtitle: "작사 참여",
    album: album8,
    url: "https://www.youtube.com/watch?v=Qvavpj87i-A",
  },
  {
    title: "Do What You Like",
    subtitle: "OST",
    album: album9,
    url: "https://www.youtube.com/watch?v=6ec5v1ndt18",
  },
  {
    title: "Like my groove",
    subtitle: "콜라보 싱글",
    album: album10,
    url: "https://www.youtube.com/watch?v=HvocbPnnbhk",
  },
  {
    title: "당신의 밤은 나의 밤과 \n같습니까 (feat.숨비)",
    subtitle: "프로젝트 싱글",
    album: album11,
    url: "https://www.youtube.com/watch?v=tFEe3pwlQgE",
  },
  {
    title: "Romantico (feat. 한로로)",
    subtitle: "피쳐링",
    album: album12,
    url: "https://www.youtube.com/watch?v=kKf4_VMlKec",
  },
  {
    title: "물수제비",
    subtitle: "프로듀싱 참여",
    album: album13,
    url: "https://www.youtube.com/watch?v=At4xTbav5ic",
  },
];

export const INTERVIEW = [
  {
    content: `“저는 일단 노래를 시작하게 된 이유가 제 이야기를 어딘가에
풀어내보고 싶단 생각에서였어요. 말로 하기엔 뭔가 민망하고, 얼굴을
모르는 사람들에게도 내 메세지를 전하면서 소통할 수 있으면 좋겠다는
생각을 하며 노래를 시작하게 된 것 같아요.”...`,
    url: "https://www.indiepost.co.kr/post/16936",
  },
];
