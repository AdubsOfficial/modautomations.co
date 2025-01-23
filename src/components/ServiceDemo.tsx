import React from 'react';
import LeadGenerationDemo from './demos/LeadGenerationDemo';
import WebsiteCreationDemo from './demos/WebsiteCreationDemo';
import CustomerSupportDemo from './demos/CustomerSupportDemo';

interface ServiceDemoProps {
  serviceId: string;
  onClose: () => void;
}

export default function ServiceDemo({ serviceId, onClose }: ServiceDemoProps) {
  switch (serviceId) {
    case 'lead-generation':
      return <LeadGenerationDemo onClose={onClose} />;
    case 'website-creation':
      return <WebsiteCreationDemo onClose={onClose} />;
    case 'customer-support':
      return <CustomerSupportDemo onClose={onClose} />;
    default:
      return null;
  }
}