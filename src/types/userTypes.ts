export interface UserType {
    id: string,
    rank: number,
    name: string,
    email: string,
    friends: string[],
    image: string,
    friendNames?: string[],
    highestRankingFriend?: string
}