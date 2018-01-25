# NestJS validation pipe

This repository reproduces what looks like a bug.

## Reproducibility steps

Clone, install and start the NestJS application: 

```
git clone https://github.com/fwoelffel/nestjs-validation-bug.git
cd nestjs-validation-bug
npm install
npm start
```

Now, the `http://localhost:3000` endpoint expects a `POST` request containing a payload of type `MyDto`.
Here is the DTO definition:

```ts
import { IsNumber } from 'class-validator';

export class MyDto {
  @IsNumber()
  readonly test: number;
}
```

And here is the controller:

```ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { MyDto } from "./my.dto";

@Controller()
export class AppController {
  @Post()
  root(@Body(new ValidationPipe()) data: MyDto) {
    return data.test;
  }
}
```

Finally, here is the  `cURL` command to perform a request with an invalid payload (according to my DTO definition):

```
curl -v \
  http://localhost:3000/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"test": "I AM NOT A NUMBER! PLEASE TRIGGER A VALIDATION ERROR"
}'
```

As you can see, here is what the controller responds:

```
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> POST / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.47.0
> Accept: */*
> cache-control: no-cache
> content-type: application/json
> Content-Length: 66
> 
* upload completely sent off: 66 out of 66 bytes
< HTTP/1.1 201 Created
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 52
< ETag: W/"34-dEFIJF4e8ZgnTeWs0topCHUb1WY"
< Date: Thu, 25 Jan 2018 17:51:12 GMT
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
I AM NOT A NUMBER! PLEASE TRIGGER A VALIDATION ERROR% 
```

The expected output was obviously a validation error response.