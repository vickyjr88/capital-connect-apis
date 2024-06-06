import { InternalServerErrorException } from "@nestjs/common";

const throwInternalServer = (error: Error) => {
    throw new InternalServerErrorException(error.message || "Something went wrong. Please try again later.");
}

export default throwInternalServer;
