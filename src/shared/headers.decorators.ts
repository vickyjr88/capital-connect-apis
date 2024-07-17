import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HeadersToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.pesapal_authorization;
  },
);
