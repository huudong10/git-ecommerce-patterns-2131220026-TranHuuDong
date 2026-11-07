import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        const { userId, productIds, shippingInfo } = orderDetails;
        console.log(`[Checkout] Starting order for user ${userId}...`);

        // 1. Kiểm tra tồn kho
        if (!this.inventoryService.checkStock(productIds)) {
            console.log('[Checkout] Failed: some items are out of stock.');
            return false;
        }

        // 2. Thanh toán (số tiền giả lập: 100 cho mỗi sản phẩm)
        const amount = productIds.length * 100;
        if (!this.paymentService.processPayment(userId, amount)) {
            console.log('[Checkout] Failed: payment was declined.');
            return false;
        }

        // 3. Sắp xếp vận chuyển
        const shipment = this.shippingService.arrangeShipping(userId, shippingInfo);
        if (!shipment) {
            console.log('[Checkout] Failed: could not arrange shipping.');
            return false;
        }

        console.log(`[Checkout] Order placed successfully! Tracking ID: ${shipment.trackingId}`);
        return true;
    }
}

export { CheckoutFacade };