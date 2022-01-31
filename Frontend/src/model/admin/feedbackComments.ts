interface ISignedUrlObj {
    signedUrl: string;
    date: number;
}

export interface ISignedUrls {
    [key: string] : ISignedUrlObj
}