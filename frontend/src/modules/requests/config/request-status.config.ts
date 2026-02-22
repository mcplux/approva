import type { FunctionalComponent } from 'vue'
import { Check, Clock, Eye, X } from 'lucide-vue-next'
import type { Request } from '../types/request.type'

type RequestStatus = Request['status']
type StatusUIConfig = {
  textColor: string
  bgColor: string
  component: FunctionalComponent
  label: string
}

export const requestStatusConfig: Record<RequestStatus, StatusUIConfig> = {
  created: {
    textColor: 'text-amber-500',
    bgColor: 'bg-amber-500',
    component: Clock,
    label: 'Pending',
  },
  'in-review': {
    textColor: 'text-blue-500',
    bgColor: 'bg-blue-500',
    component: Eye,
    label: 'In review',
  },
  approved: {
    textColor: 'text-green-500',
    bgColor: 'bg-green-500',
    component: Check,
    label: 'Approved',
  },
  rejected: {
    textColor: 'text-red-500',
    bgColor: 'bg-red-500',
    component: X,
    label: 'Rejected',
  },
}
