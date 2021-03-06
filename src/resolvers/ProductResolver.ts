import { VariablesAreInputTypes } from 'graphql/validation/rules/VariablesAreInputTypes'
import { Resolver, Query, Mutation, Arg, Field, InputType } from 'type-graphql'
import { Product } from '../entity/Product'

@InputType()
class ProductInput {
    @Field()
    name!:string

    @Field()
    quantity!:number
}

@Resolver()
export class ProductoResolver{
    @Mutation(()=>Product)
    async createProduct(
        @Arg("variables",()=>ProductInput) variables:ProductInput
    ){
        const newProduct = Product.create(variables);
        return await newProduct.save();
        
    }

    @Query(()=>[Product])
    products(){
        return Product.find()
    }
}