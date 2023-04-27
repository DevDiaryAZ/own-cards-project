// AUTH TYPES
export type TResponseAuthData = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date | null
    updated: Date | null
    token?: string
    avatar?: string
}

export type TGetPacksData = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number

    user_id?: string
    block?: boolean
}

// PACKS TYPES
export type TResponsePacksData = {
    cardPacks: TCardPack[]

    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
};

export type TCardPack = {
    _id: string,
    user_id: string,
    name: string,
    user_name: string
    cardsCount: number,
    created: Date | null,
    updated: Date | null,
};

export type TAddNewPackData = {
    cardsPack: {
        name?: string
        deckCover?: string
        private?: boolean
    }
}

export type TUpdatePackData = {
    cardsPack: {
        _id: string
        name: string
    }
}

// CARDS TYPES
export type TGetCardsData = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type TResponseCardsData = {
    cards: TCard[]

    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
};

export type TCard = {
    answer: string
    question: string
    questionImg: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type TAddNewCardData = {
    card: {
        cardsPack_id?: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}


