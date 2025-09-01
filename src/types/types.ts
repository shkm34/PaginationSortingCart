export interface Product {
id: number;
title: string;
price: number;
thumbnail?: string;
rating?: number;
category?: string;
description?: string;
}


export type CartItem = {
productId: number;
title: string;
price: number;
quantity: number;
thumbnail?: string;
};