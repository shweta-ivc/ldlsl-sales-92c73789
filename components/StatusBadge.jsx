'use client';

import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        draft: 'bg-gray-100 text-gray-800',
        scheduled: 'bg-blue-100 text-blue-800',
        sent: 'bg-green-100 text-green-800',
        archived: 'bg-yellow-100 text-yellow-800',
      },
    },
    defaultVariants: {
      variant: 'draft',
    },
  }
);

export default function StatusBadge({ status, className }) {
  const getStatusText = (status) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'scheduled': return 'Scheduled';
      case 'sent': return 'Sent';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

  return (
    <span className={cn(statusVariants({ variant: status }), className)}>
      {getStatusText(status)}
    </span>
  );
}