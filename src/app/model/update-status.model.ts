export class UpdateStatusModel {
    public status: StatusFlag;
    public message: string;
}

export enum StatusFlag {
    FAILURE = 'FAILURE',
    SUCCESS = 'SUCCESS',
}
