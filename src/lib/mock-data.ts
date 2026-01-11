import { Destination, Feature, Package, Testimonial } from '@/types/home.types';

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Local Experts',
    description: 'Guided by natives who know every hidden trail and story.',
    icon: 'diversity_3',
  },
  {
    id: '2',
    title: 'Premium Safety',
    description:
      'Top-tier equipment and certified protocols for your peace of mind.',
    icon: 'verified_user',
  },
  {
    id: '3',
    title: 'Transparent Pricing',
    description: 'Luxury experiences at honest prices. No hidden costs, ever.',
    icon: 'currency_rupee',
  },
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'kedarnath',
    name: 'Kedarnath',
    description:
      'The holiest shrine of Lord Shiva amidst the snow-capped peaks.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Vutf79P1JbferUB1rSGpd69m8ljjjv6zsEvJp_dmufWeKRxkU8lHtFbFBr85UejtCJt6nYoBi_KVfsArxdYP6ZDGVkwN5dtIpk9yTTiS63d1biIlebMeRddsTV6HtP-bJtpZILMtSQnkCFtPsu1Wb3PQ-dGb1eU3QOMT0bJp0wzeyAB6a-8f3UxGByD73msQgTr0RUq82C9C02Kr5GRv378feujSbKww0kR2QcToaGUzLxfnEfnMr-OPSsT4KG1S1tvQhcD-vwDW',
    category: 'Pilgrimage',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    description: 'Yoga capital of the world and hub for river rafting.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcHk-IZe8S_A1csjn3jaAw7Tf8JlZQNdkytOB_scux1xdp4UL4yKO79wfodsp0hAFjfxBv_M_p7--A8CnPoFvOqi1U9A-WTR4ZTqAiWAWUNX3QNvgmCAvLrL3o46wTuuvAdNs9OQQKv0i3Q3oHM2GAVwtPbS95fYyZsnycY8RxJQzCZ0nGWhSLGahCE0UC7jsrrhAb3IMPIYx4L1qFQ5VlILcIcEBVPK02Qxo5nk9CDlBaw2SsEiPsixVcBt_mQB8MKZC7MwFr1hRA',
    category: 'Adventure',
  },
  {
    id: 'valley-of-flowers',
    name: 'Valley of Flowers',
    description:
      'A UNESCO World Heritage site known for its meadows of endemic alpine flowers.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAk8w9qbyjTBUHrYEBr3ZiUU1NfKgMGI8EJW42U4B7b8Pq3YWdIK8U5skTa6hud6Fl7skZph-Y44gCU0kIFb4eu7kHwRyvOs-KV7zrSZU5ao4UL7N6PB_PSUEHo5O2bJTbHgotk6_v1HLq9AreCB7AaGtBA2WkOsgtdcl4qUVgCDAXiyL44r7GJ_Z5xKM5wLbLcyA8gUp0BH90k8sHd7cQOO5TUyyn_RJX5w0ZxbgLjmdZgZLbyQenvoXY_M64_2YL54w2je0KhRtCT',
    category: 'Nature',
  },
  {
    id: 'nainital',
    name: 'Nainital',
    description:
      'The city of lakes, offering serene boat rides and colonial charm.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzt2icQrPH0hYRJ3Gvbpz5nfDxrg4UeDc-6sQtnvIrarVLmOmM3pnsjhUTl8iOGC0JhZUu_J1wQH1Fjo-EJeoI1RrK8ccsEz7c31gVdo2TEhtg--aV15JHKfYbcMsTB4WWM-6P1F3zoEBSGtcCH4GKxW9pBgW6QKILuD4HdlSQKbtw6CM1EZOCl9S0t_UxCz8fAW2XhN9ZZPzAnQ33q-X4wWtSc3OYwky_Mj3Nz99cljYBiOtF5EyEgPhuPehtu0ZG4mABUxv5ELv8',
    category: 'Leisure',
  },
];

export const PACKAGES: Package[] = [
  {
    id: 'char-dham-heli',
    slug: 'char-dham-heli',
    title: 'Char Dham by Heli',
    description:
      'The ultimate pilgrimage experience with VIP darshan and luxury stays.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDyPfT_FiLu-0CzyElzSPeCx7zMVi_Ti_l4ciJtTO3iaHuk65dIqYQ25DJZ6UDLdXZO57fFfyjFVWy1GDd53ktHogU6Lc-MWKz0yEhbl4Zk3PDdeSuyun7Gkqcx-ZRI5bnJ7uyFMo1Gbc58AD1riDWMk3f_hGu6ReEIR4IlUbpi04NhzQxQ5yf_94LnAO5rlQtz6CJUpG4xUUCcmbtjzvrQTHM6a8hPCGpsMxYd4ZHMg85wbjZUAUs9bHzSN6oP5zPEPxCFMw30IbME',
    duration: '6 Days',
    rating: 4.5,
    price: 145000,
  },
  {
    id: 'rishikesh-rafting',
    slug: 'rishikesh-rafting',
    title: 'Rishikesh Rafting',
    description:
      'Adrenaline pumping white water rafting and serene camping by the Ganges.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChG8DAmK1qZVtlgpeoKZpfJ7Zq33rPKpU9K_xMOdyjhqQNGz9meyacwEHOqprISScWIJIH5P1EL-ghrPByHl5XCNFJ3ezUL17wGM3JbyygXQ8a48h4w2Dcg1JA-Z_CoDL8p3z_7_X2dUK0repguyIVSKEG2-sdHykiQwU93fasZQKMsl4fi8bURSYgMkEIiRnnLYNJglYkw8jeQTDiJtx1-AlE--ueOAW-UZZLzhfb3H5TXlsKthEB8a0BBMX-rnI22gMKUv4NnahB',
    duration: '3 Days',
    rating: 5,
    price: 4999,
  },
  {
    id: 'jim-corbett-safari',
    slug: 'jim-corbett-safari',
    title: 'Jim Corbett Safari',
    description:
      "Explore India's oldest national park and spot the majestic Bengal Tiger.",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoGsxCe6_BipHgcHSqRFfstv83zh5EK9Lo2CWfTsG5xUbVT9NtCT0u45U3H3hWbZadCwKlvzh6GmmfCNMMCaZAa3MYErTcFxgZHJCh3-YWcopavLa1uw1afhPJDv5uv12opdd9B7dViF7O981cLi-GuwawMwm-S3On2xOrZ0licJFedbW4AMTDd7wM-LeuQJPWbYR4aaoM9uEk4RKx40e1MHbHnWDnUG472xAXHe128cQjzg7ZGD6UKXx5HHMgs4hYZ4AGX_MEIUyZ',
    duration: '4 Days',
    rating: 4,
    price: 12500,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    location: 'Delhi, India',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmoP83Hoz7XzHMbOXO7OZbNaFi8mq6k5He9pe52wTr6yoJeUpG3eMU0sQn3Hcj_GQCIYD-OlfXsbzIziDDGKTeC2gCk3Q5lQDTMHEMAlg44wAXXc_S2DOR22Y6lY0yKwcJUzWm4PVx9OXK7BR1S-WpPrXgm4a7Cc91uKegKzFmfP__oftY-v7rykP5HHINsIjtSMhXWDqFtrmJComvJijISpdsUHM0Vbn0f0CzqnzzRKRq3ZJ5lDzz-DrZ4dC-8wAjt5vR4sDBm0Je',
    quote:
      'The trip to Kedarnath was magical. Everything from the helicopter booking to the stay was perfectly handled.',
    rating: 4,
  },
  {
    id: '2',
    name: 'Priya Verma',
    location: 'Mumbai, India',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRtLP2OJUw9JiX0U_VdcWAwCFn3_N72uU5dY5RzF_kbViXI0lbxO8BM8omnfYdq69A5PEQNoX_--fs6UWnJXW4fVp4y6sATFttXTdhgGER3pQWzjG51otvtl06Zm5mg4eTS98zqI-8gEEuRKpKSQTWXZ9DksCikFhNH8-ZzODGZ2lLrcQV2qCp7IF5-svD0L7OaCxLEGZyjmWVZs9nVDqhCiqAI46_M0QNTh60-WOKkVorZiLyTpr6dt77oBtuEC6idaB6zGFLTASy',
    quote:
      'Camping in Rishikesh was the best weekend getaway. The rafting guides were very professional.',
    rating: 5,
  },
];
