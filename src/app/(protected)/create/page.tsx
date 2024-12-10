'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

type FormInputs = {
    repoUrl: string,
    projectName: string,
    githubToken?: string
}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInputs>();

    function onSubmit(data: FormInputs) {
        window.alert(JSON.stringify(data))
        return true;
    }

    return (
        <div className="flex items-center gap-12 h-full justify-center">
            <img src="/gitImg.svg" className="h-56 w-auto"/>
            <div>
                <div>
                    <h1 className="font-semibold text2xl">
                        Link your GitHub Repository
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the URL of your repository to link it to GitAI
                    </p>
                </div>
                <div className="h-4"></div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            {...register('projectName', {required: true})}
                            placeholder="Peoject Name"
                            required
                        />
                        <div className="h-2"></div>
                        <Input
                            {...register('repoUrl', {required: true})}
                            placeholder="Github URL"
                            type="url"
                            required
                        />
                        <div className="h-2"></div>
                        <Input
                            {...register('githubToken')}
                            placeholder="Github Token (Optional)"
                        />
                        <div className="h-4"></div>
                        <Button type="submit">
                            Check Credits
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePage