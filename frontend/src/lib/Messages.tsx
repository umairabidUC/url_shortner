import { message } from "antd"

export const [messageApi] = message.useMessage()

export const errorMessage = (error: string) => {
    messageApi.open({
        type: "error",
        content: error
    })
}

export const successMessage = (success: string) => {
    messageApi.open({
        type: "success",
        content: success
    })
}