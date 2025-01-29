export interface IResponse<T> {
    data: T
}

export interface ILoginEntery {
    login: string;
    password: string;
} 

export interface ILoginCreate {
    login: string;
    password: string;
    name: string;
    surname: string;
    middleName: string;
    position: string;
    division: string;
}

export interface IMine {
    message?: string;
    _id: string;
    name: string;
    sections: ISection[];
}

export interface ISection {
    name: string;
    combine_complexs: ICombineComplexs[];
}

export interface ICombineComplexs {
    name: string;
    combineId: string;
    bunkerId: string;
    samohodniVagonId: string;
}