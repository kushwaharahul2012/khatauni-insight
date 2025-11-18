import { http, HttpResponse } from 'msw';

// TODO: Replace these mock handlers with actual backend integration
export const handlers = [
  // POST /api/upload - Upload khatauni document
  http.post('/api/upload', async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('file');
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return HttpResponse.json({
      uploadId: `upload_${Date.now()}`,
      status: 'uploaded',
      filename: file instanceof File ? file.name : 'unknown',
    });
  }),

  // GET /api/ocr-status - Get OCR processing status
  http.get('/api/ocr-status', ({ request }) => {
    const url = new URL(request.url);
    const uploadId = url.searchParams.get('uploadId');
    
    return HttpResponse.json({
      uploadId,
      status: 'processing',
      progress: 75,
      step: 'Extracting text from document',
    });
  }),

  // POST /api/parse - Get parsed khatauni data
  http.post('/api/parse', async ({ request }) => {
    const body = await request.json() as { uploadId: string };
    
    return HttpResponse.json({
      uploadId: body.uploadId,
      header: {
        village: 'रामपुर (Rampur)',
        khatauniNo: '123/456',
        fasliYear: '1432-1433 (2025-26)',
        tehsil: 'Sadar',
        district: 'Meerut',
      },
      owners: [
        {
          name: 'राम कुमार शर्मा (Ram Kumar Sharma)',
          fatherName: 'श्री लाल शर्मा (Shri Lal Sharma)',
          share: '1/4',
          percentage: 25.0,
        },
      ],
      mutations: [
        {
          year: '2023',
          description: 'Inheritance transfer / विरासत हस्तांतरण',
        },
      ],
      risks: ['FREQUENT_MUTATIONS'],
    });
  }),

  // POST /api/pay - Initiate payment for export
  http.post('/api/pay', async ({ request }) => {
    const body = await request.json() as { uploadId: string; tier: number; amount: number };
    
    // Simulate payment gateway delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return HttpResponse.json({
      paymentUrl: `https://payment-gateway.example.com/pay?orderId=${body.uploadId}&amount=${body.amount}`,
      orderId: `order_${Date.now()}`,
    });
  }),

  // GET /api/history - Get user's upload history
  http.get('/api/history', () => {
    return HttpResponse.json({
      uploads: [
        {
          id: 'upload_1',
          filename: 'khatauni_rampur_123.jpg',
          uploadedAt: '2024-01-15 14:30',
          status: 'complete',
          isPaid: true,
          village: 'Rampur',
        },
        {
          id: 'upload_2',
          filename: 'land_record_scan.pdf',
          uploadedAt: '2024-01-14 10:15',
          status: 'complete',
          isPaid: false,
          village: 'Shamli',
        },
      ],
    });
  }),
];
