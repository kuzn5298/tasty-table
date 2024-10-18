import React from 'react';
import { SvgIcon, SvgIconProps } from '../SvgIcon';

export const CartIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon viewBox='0 0 32 32' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.1331 32C10.3567 32 8.91262 32 7.75342 31.8605C6.54184 31.7161 5.50381 31.4076 4.59512 30.6954C3.68806 29.9865 3.13794 29.0511 2.70242 27.9089C2.28656 26.8144 1.93782 25.4113 1.50721 23.6833L1.463 23.511C0.781897 20.7787 0.236684 18.5961 0.0614954 16.8648C-0.118605 15.0761 0.061495 13.5204 1.07824 12.2125C1.54159 11.6185 2.09663 11.1787 2.73189 10.8537L3.7601 7.07446C4.14814 5.64513 4.43139 4.60472 5.03063 3.79405C5.62616 2.99057 6.43525 2.37128 7.36539 2.00697C8.14473 1.70174 9.01577 1.65087 10.1357 1.64267C10.3679 1.15113 10.7346 0.735803 11.1932 0.445001C11.6517 0.154198 12.1832 -0.000120262 12.7258 7.03197e-08H19.2749C20.4178 7.03197e-08 21.405 0.672821 21.8651 1.64103C22.9834 1.65087 23.856 1.70174 24.6354 2.00697C25.5657 2.37173 26.3749 2.99161 26.9702 3.79569C27.571 4.60472 27.8526 5.64513 28.2407 7.07446L29.2689 10.8537C29.9025 11.1803 30.4592 11.6185 30.9225 12.2125C31.9393 13.5204 32.1194 15.0777 31.9376 16.8632C31.7625 18.5961 31.2172 20.7787 30.5378 23.5093L30.4936 23.6833C30.063 25.4113 29.7126 26.8144 29.2984 27.9089C28.8628 29.0511 28.3127 29.9865 27.404 30.697C26.497 31.4076 25.4573 31.7145 24.2474 31.8622C23.0865 32 21.6441 32 19.8676 32H12.1331ZM8.25934 4.29949C8.61954 4.15836 9.05506 4.11733 10.1373 4.10585C10.599 5.07405 11.5847 5.74359 12.7242 5.74359H19.2733C20.4161 5.74359 21.4018 5.07405 21.8635 4.10585C22.9457 4.11733 23.3812 4.15836 23.7414 4.29949C24.2424 4.49641 24.678 4.82954 24.9989 5.26277C25.287 5.65169 25.4557 6.19487 25.9321 7.94585L26.5117 10.0743C24.8122 9.84615 22.6183 9.84615 19.8922 9.84615H12.1069C9.38251 9.84615 7.18856 9.84615 5.48907 10.0743L6.06867 7.94585C6.54348 6.19487 6.71375 5.65169 7.00191 5.26277C7.32251 4.82972 7.75828 4.49589 8.25934 4.29949ZM13.3807 12.3077H12.2117C9.27609 12.3077 7.20985 12.311 5.68718 12.5309C5.5057 12.557 5.32498 12.5882 5.14524 12.6244L8.73088 17.8987L13.3807 12.3077ZM2.96766 13.7928C2.54524 14.3737 2.36023 15.1664 2.50595 16.6154C2.66149 18.1497 3.16086 20.16 3.87144 23.0121L4.01225 23.575L7.09688 19.8646L2.96766 13.7928ZM4.80141 26.4697C4.8669 26.6699 4.93294 26.8576 4.99952 27.0326C5.34499 27.9434 5.68391 28.4242 6.1096 28.7557C6.53365 29.0888 7.0805 29.3005 8.0465 29.417C9.04524 29.5368 10.3387 29.5385 12.2117 29.5385H13.6787L8.53441 21.9783L4.80141 26.4697ZM18.3253 29.5385L23.4877 21.9487L27.201 26.4681C27.1355 26.6683 27.07 26.8565 27.0045 27.0326C26.6574 27.9434 26.3185 28.4242 25.8945 28.7557C25.4704 29.0872 24.9219 29.3005 23.9576 29.417C22.9588 29.5368 21.6654 29.5385 19.7923 29.5385H18.3253ZM27.9951 23.5618L28.131 23.0121C28.8432 20.1584 29.3426 18.1497 29.4965 16.6137C29.6438 15.1664 29.4588 14.3737 29.0364 13.7928L24.9301 19.8318L27.9951 23.5618ZM26.8588 12.6244C26.6791 12.5882 26.4984 12.557 26.3169 12.5309C24.7942 12.311 22.728 12.3077 19.7923 12.3077H18.7477L23.3026 17.8511L26.8588 12.6244ZM12.7258 2.46154C12.6173 2.46154 12.5132 2.50476 12.4364 2.5817C12.3596 2.65864 12.3165 2.76299 12.3165 2.87179C12.3165 2.9806 12.3596 3.08495 12.4364 3.16189C12.5132 3.23883 12.6173 3.28205 12.7258 3.28205H19.2749C19.3835 3.28205 19.4876 3.23883 19.5644 3.16189C19.6411 3.08495 19.6843 2.9806 19.6843 2.87179C19.6843 2.76299 19.6411 2.65864 19.5644 2.5817C19.4876 2.50476 19.3835 2.46154 19.2749 2.46154H12.7258ZM16.0659 12.9182L21.8618 19.9696L16.0004 28.585L10.1684 20.0123L16.0659 12.9182Z'
      fill='currentColor'
    />
  </SvgIcon>
);
