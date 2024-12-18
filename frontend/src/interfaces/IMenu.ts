export interface MenuInterface {
    ID?: number;
    MenuName?: string;
    MenuPrice?: number;
    AmountSold?: number;
    Amount?: number;
    CategoryID?: {
        category_name: string; // Assuming `category_name` is a string
    };
    UserID?: number;
}
