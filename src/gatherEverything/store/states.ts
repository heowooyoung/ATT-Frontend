export interface AICommandState {
    aiCommandResult: unknown, 
}

export interface TravelReview {
    ReviewId: number
    title: string
    writer: string
    point: number
    review: string
    regDate: string
    updDate: string
}

const state: AICommandState = {
    aiCommandResult: {} as any // map(dict)계열로 잡고 무엇이든 올 수 있다.
}

export default state