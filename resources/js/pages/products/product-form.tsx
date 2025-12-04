import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LetesseTextarea } from '@/components/ui/letesse-textarea';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product Form',
        href: products.create().url,
    },
];

export default function ProductForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        image: null as File | null,
        stock: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(products.store().url, {
            onSuccess: () => {
                console.log('Product created successfully');
                reset();
            },
        });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setData('image', event.target.files[0]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="p-4">
                <Link
                    as="button"
                    href="/products"
                    className="ml-auto flex gap-3 rounded-sm p-2 transition-colors duration-200 hover:bg-gray-800"
                >
                    <ArrowLeft />
                    Back to Products
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle>Product Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                            autoComplete="off"
                        >
                            <div className="grid gap-4">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Product Name"
                                        autoFocus
                                        tabIndex={1}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />

                                    <InputError message={errors.name} />
                                </div>
                                {/* Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <LetesseTextarea
                                        id="description"
                                        name="description"
                                        placeholder="Product Description"
                                        tabIndex={2}
                                        className="field-sizing-content max-h-32 min-h-8"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />

                                    <InputError message={errors.description} />
                                </div>
                                {/* Price */}
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="Product Price"
                                        tabIndex={3}
                                        value={data.price}
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                    />

                                    <InputError message={errors.price} />
                                </div>
                                {/* Image */}
                                <div className="grid gap-2">
                                    <Label htmlFor="image">Image</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        placeholder="Product Image"
                                        tabIndex={4}
                                        // value={data.image}
                                        onChange={handleImageUpload}
                                    />

                                    <InputError message={errors.image} />
                                </div>
                                {/* Stock */}
                                <div className="grid gap-2">
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        placeholder="Product Stock"
                                        tabIndex={5}
                                        value={data.stock}
                                        onChange={(e) =>
                                            setData('stock', e.target.value)
                                        }
                                    />

                                    <InputError message={errors.stock} />
                                </div>
                                {/* Submit */}
                                <div className="grid gap-2">
                                    <Button
                                        type="submit"
                                        className="w-fit cursor-pointer"
                                        tabIndex={6}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
