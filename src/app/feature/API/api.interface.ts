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
    boss: string;
    combine_complexs: ICombineComplexs[];
}

export interface ICombineComplexs {
    name: string;
    brigadir: string;
    combineId: string;
    bunkerId: string;
    work_shift?: string;
    samohodniVagonId: string;
}

export interface IUser {
    message: string;
    name: string;
    surname: string;
    middleName: string;
    position: string;
    division: string;
    enterpriseId: string;
}

export type IResourceData = {user: IUser, mine: IMine};

export interface ITechnicData {
    name: string;
    indications: IIndicationsTechnicData[];
}

export interface IIndicationsTechnicData {
    time: string;
    work_shift: string;
    machine_readings: IMachineReadingsData[];
}

export interface IMachineReadingsData {
    name_machine_readings: string;
    readings: number[];
    times_readings: string[];
}

export interface IWorkShiftMonthPlan {
    work_shift: string;
    time: string;
    combineId?: string;
    bunkerId?: string;
    samohodniVagonId?: string;
    brigadir?: string;
    indications_work_shift: {
        times_readings: string[];
        readings: number[];
        plan: string;
        name_machine_readings: string;
    },
    indications_month: {
        times_readings: string[];
        readings: number[];
        plan: string;
        name_month: string;
        name_machine_readings: string;
    }
}

export interface IIdDateWorkShift {
    combineId: string;
    bunkerId: string;
    samohodniVagonId: string,
    workShiftId: string;
    monthPlanId: string;
}

export interface IIndicationsMonth {
    indications_month: {
        times_readings: string[];
        readings: number[];
        plan: string;
        name_month: string;
        name_machine_readings: string;
    }
}

export interface IIndicationsWorkShift {
    work_shift: string;
    time: string;
    indications_work_shift: {
        times_readings: string[];
        readings: number[];
        plan: string;
        name_machine_readings: string;
    };
}