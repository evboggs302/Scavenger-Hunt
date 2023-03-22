import mongoose from "mongoose";
declare const clueResolvers: {
    Query: {
        getCluesByHuntId: ({ args }: {
            args: {
                id: string;
            };
        }) => mongoose.Aggregate<any[]>;
    };
};
export default clueResolvers;
