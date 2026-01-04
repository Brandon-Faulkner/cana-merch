import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/cart-provider';
import { formatPrice } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const PICKUP_OPTION = {
  id: 'pickup',
  label: 'Pick Up In Person',
  cost: 0,
  days: 'Free',
  stripeRateId: null,
};

export function ShippingForm() {
  const { shippingOption, setShippingOption } = useCart();
  const [shippingOptions, setShippingOptions] = useState(PICKUP_OPTION);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShippingRates = async () => {
      try {
        const response = await fetch('/api/shipping-rates');
        if (!response.ok) throw new Error('Failed to fetch shipping rates');
        const rates = await response.json();
        setShippingOptions([PICKUP_OPTION, ...rates]);
      } catch (error) {
        console.error('Error fetching shipping rates:', error);
        setShippingOptions([PICKUP_OPTION]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShippingRates();
    setShippingOption(PICKUP_OPTION);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipping Method</CardTitle>
          <CardDescription>Loading shipping options...</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center py-8'>
          <Loader2 className='h-6 w-6 animate-spin' />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Method</CardTitle>
        <CardDescription>Select your preferred shipping option</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={shippingOption?.id}
          onValueChange={(value) => {
            const selected = shippingOptions.find((opt) => opt.id === value);
            setShippingOption(selected);
          }}
        >
          <div className='space-y-3'>
            {shippingOptions.map((option) => (
              <div
                key={option.id}
                className='hover:bg-muted flex cursor-pointer items-center space-x-2 rounded-lg border p-3'
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className='flex-1 cursor-pointer'>
                  <div className='flex justify-between'>
                    <span className='font-medium'>{option.label}</span>
                    {option.cost > 0 && (
                      <span className='font-semibold'>&nbsp;+&nbsp;{formatPrice(option.cost)}</span>
                    )}
                  </div>
                  <p className='text-muted-foreground text-sm'>{option.days}</p>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
