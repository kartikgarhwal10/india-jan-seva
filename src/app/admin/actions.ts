'use server';

import { revalidatePath } from 'next/cache';
import { 
  updateOrderStatus, 
  updateProduct, 
  Order, 
  Product 
} from '@/lib/db';

export type AdminActionResponse = {
  success: boolean;
  message: string;
};

// Update order status & shipping info
export async function updateOrderAdminAction(
  orderId: string,
  status: Order['orderStatus'],
  trackingNumber: string,
  paymentStatus: Order['paymentStatus']
): Promise<AdminActionResponse> {
  try {
    const success = updateOrderStatus(orderId, status, trackingNumber, paymentStatus);
    if (!success) {
      return { success: false, message: 'Order ID not found in database.' };
    }
    
    // Refresh cash
    revalidatePath('/admin/orders');
    revalidatePath('/admin/dashboard');
    revalidatePath('/track');
    
    return { success: true, message: 'Order updated successfully!' };
  } catch (error: any) {
    console.error('Error in updateOrderAdminAction:', error);
    return { success: false, message: error.message || 'An error occurred during status update.' };
  }
}

// Update PVC card product pricing/status
export async function updateProductAdminAction(
  productId: string,
  updates: { price: number; status: 'Active' | 'Inactive' }
): Promise<AdminActionResponse> {
  try {
    const success = updateProduct(productId, updates);
    if (!success) {
      return { success: false, message: 'Product ID not found.' };
    }

    revalidatePath('/admin/products');
    revalidatePath('/pvc-cards');
    
    return { success: true, message: 'Product configured successfully!' };
  } catch (error: any) {
    console.error('Error in updateProductAdminAction:', error);
    return { success: false, message: error.message || 'An error occurred.' };
  }
}
