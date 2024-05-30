import React from 'react';

export const MailTo = React.memo(({ children }) =>
    typeof children === 'string' ? <a href={`mailto:${children}`}>{children}</a> : null
);

export const LinkTo = React.memo(({ children, text = children, link = children }) =>
    (text && link) ? <a href={link}>{text}</a> : null
);

