//<-------QuizType領域---------
export enum QuizTypeEnum {
    Simple,
    FourOptions,
    SimpleImage,
    FourOptionsImage,
};

export class QuizType {
    public id : number;
    public  name : string;

    constructor(id: number, name: string ) {
        this.id = id;
        this.name = name;
    }
};

export const quizTypeDic = new Map<QuizTypeEnum,  QuizType>();

quizTypeDic.set(QuizTypeEnum.Simple, new QuizType(1, "一問一答"))
quizTypeDic.set(QuizTypeEnum.FourOptions, new QuizType(2, "四択問題"))
quizTypeDic.set(QuizTypeEnum.SimpleImage, new QuizType(3, "画像付き一問一答"))
quizTypeDic.set(QuizTypeEnum.FourOptionsImage, new QuizType(4, "画像付き四択問題"))

export const getQuizType = ( type : QuizTypeEnum ) : QuizType | undefined => {
    return quizTypeDic.get(type);
}

const quizEnumDic = new Map<Number | undefined, QuizTypeEnum>();
quizEnumDic.set(getQuizType(QuizTypeEnum.Simple)?.id, QuizTypeEnum.Simple,);
quizEnumDic.set(getQuizType(QuizTypeEnum.FourOptions)?.id, QuizTypeEnum.Simple);
quizEnumDic.set(getQuizType(QuizTypeEnum.SimpleImage)?.id, QuizTypeEnum.SimpleImage,);
quizEnumDic.set(getQuizType(QuizTypeEnum.FourOptionsImage)?.id, QuizTypeEnum.FourOptionsImage,);

export const getQuizTypeEnum = ( quizTypeId : number ) : QuizTypeEnum | undefined => {
    return quizEnumDic.get(quizTypeId);
}

//-------QuizType領域--------->

//<-------QuizGenre領域---------

export enum QuizGenreEnum {
   Science,
   Literature,
   SocialStudy,
   Music,
   Sports,
   Entertainment,
   Subculture,
   Lifestyle,
   Nongenre,
}

export class QuizGenre {
    public id : number;
    public name : string;
    public genreEnum : QuizGenreEnum;

    constructor(initialId: number, initialName: string, initialEnum : QuizGenreEnum ) {
        this.id = initialId;
        this.name = initialName;
        this.genreEnum = initialEnum;
    }
}

export const quizGenreDic = new Map<QuizGenreEnum, QuizGenre>();
quizGenreDic.set(QuizGenreEnum.Science, new QuizGenre(1, "自然科学", QuizGenreEnum.Science)); 
quizGenreDic.set(QuizGenreEnum.Literature, new QuizGenre(2, "文学・語学・哲学", QuizGenreEnum.Literature)); 
quizGenreDic.set(QuizGenreEnum.SocialStudy, new QuizGenre(3, "歴史・地理・社会", QuizGenreEnum.SocialStudy)); 
quizGenreDic.set(QuizGenreEnum.Music, new QuizGenre(4, "音楽", QuizGenreEnum.Music)); 
quizGenreDic.set(QuizGenreEnum.Sports, new QuizGenre(5, "スポーツ", QuizGenreEnum.Sports)); 
quizGenreDic.set(QuizGenreEnum.Entertainment, new QuizGenre(6, "芸能", QuizGenreEnum.Entertainment)); 
quizGenreDic.set(QuizGenreEnum.Subculture, new QuizGenre(7, "サブカルチャー", QuizGenreEnum.Subculture)); 
quizGenreDic.set(QuizGenreEnum.Lifestyle, new QuizGenre(8, "ライフスタイル", QuizGenreEnum.Lifestyle)); 
quizGenreDic.set(QuizGenreEnum.Nongenre, new QuizGenre(9, "ノンジャンル", QuizGenreEnum.Nongenre)); 


export const getQuizGenre = ( type : QuizGenreEnum ) : QuizGenre | undefined => {
    return quizGenreDic.get(type);
}

const quizGenreEnumDic = new Map<Number | undefined, QuizGenreEnum>();
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.Science)?.id, QuizGenreEnum.Science);
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.Literature)?.id, QuizGenreEnum.Literature);
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.SocialStudy)?.id, QuizGenreEnum.SocialStudy);
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.Music)?.id, QuizGenreEnum.Music);
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.Sports)?.id, QuizGenreEnum.Sports);
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.Entertainment)?.id, QuizGenreEnum.Entertainment);
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.Subculture)?.id, QuizGenreEnum.Subculture);
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.Lifestyle)?.id, QuizGenreEnum.Lifestyle);
quizGenreEnumDic.set(getQuizGenre(QuizGenreEnum.Nongenre)?.id, QuizGenreEnum.Nongenre);

export const getQuizGenreEnum = ( quizGenreId : number ) : QuizGenreEnum| undefined => {
    return quizGenreEnumDic.get(quizGenreId);
}
//-------QuizGenre領域--------->