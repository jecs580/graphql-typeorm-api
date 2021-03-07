import { VariablesAreInputTypes } from 'graphql/validation/rules/VariablesAreInputTypes'
import { Resolver, Query, Mutation, Arg, Field, InputType, Int } from 'type-graphql'
import { Product } from '../entity/Product'

@InputType()
class ProductInput {
    @Field()
    name!:string

    @Field()
    quantity!:number
}

@InputType()
class ProductUpdateInput {
    // Creacion de clase para poder actualizar completa o parcial un producto
    @Field(()=>String, {nullable:true})
    name?:string

    @Field(()=>Int,{nullable:true})
    quantity?:number
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
    @Mutation(()=>Boolean)
    async deleteProduct(
        @Arg('id',()=> Int) id: number
    ){
        await Product.delete(id);
        console.log(id);
        return true
    }

    @Mutation(()=>Boolean)
    async updateProduct(
        @Arg('id',()=>Int) id:number,
        @Arg('fields',()=> ProductUpdateInput) fields:ProductUpdateInput
    ){
        console.log(id, fields);
        await Product.update({id},fields);
        return true
    }

    @Query(()=>[Product])
    products(){
        return Product.find()
    }
}