export interface CreateTweetDTO {
    idUser: string;
    content: string;
    type: string;
}

export interface UpdateTweetDTO  extends Omit<CreateTweetDTO, 'type'>{
    id: string;
}

export interface DeleteTweetDTO extends Omit<CreateTweetDTO, 'content' | 'type'>{
    id: string;
}
