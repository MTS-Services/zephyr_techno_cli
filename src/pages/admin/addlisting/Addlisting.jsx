import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import AdminDashboardTitle from '../../../components/dashboards/AdminDashboardTitle';
import FormField from './components/FormField';
import TextInput from './components/TextInput';
import NumberInput from './components/NumberInput';
import SelectInput from './components/SelectInput';
import Textarea from './components/Textarea';
import FaqItem from './components/FaqItem';
import TechnicalSpecItem from './components/TechnicalSpecItem';
import ImageUpload from './components/ImageUpload';
import {
    CATEGORY_OPTIONS,
    SERIES_OPTIONS,
    MODEL_OPTIONS,
    CONDITION_OPTIONS,
    COLOR_OPTIONS,
    STORAGE_OPTIONS,
    RAM_OPTIONS,
    INITIAL_FORM,
    INITIAL_FAQS,
} from './constants';

const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'https://api-zephyr-techno.maktechgroup.tech';

const Addlisting = ({ isEdit = false, listingId = null }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        categoryId: '',
        seriesId: '',
        deviceModelId: '',
        conditionId: '',
        basePrice: '',
        stockQuantity: '',
        colorIds: [],
        storageOptionIds: [],
        ramOptionIds: [],
        introduction: '',
        listingStatus: 'ACTIVE',
    });
    const [loading, setLoading] = useState(false);
    const [faqs, setFaqs] = useState(INITIAL_FAQS);
    const [specifications, setSpecifications] = useState([{ name: '', value: '' }]);
    const [specImages, setSpecImages] = useState([]);
    
    // Attribute options from API
    const [categories, setCategories] = useState([]);
    const [allSeries, setAllSeries] = useState([]);
    const [allModels, setAllModels] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [colors, setColors] = useState([]);
    const [storageOptions, setStorageOptions] = useState([]);
    const [ramOptions, setRamOptions] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);

    // Fetch all attribute options on mount
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE_URL}/api/admin/attributes/all-options`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });
                let payload = {};
                try { payload = await res.json(); } catch { /* empty */ }
                if (!res.ok || payload.success === false) throw new Error('Failed to load options');
                
                const data = payload.data;
                setCategories(data.categories || []);
                setAllSeries(data.series || []);
                setAllModels(data.models || []);
                setConditions(data.conditions || []);
                setColors(data.colors || []);
                setStorageOptions(data.storageOptions || []);
                setRamOptions(data.ramOptions || []);
            } catch (err) {
                await Swal.fire({ icon: 'error', title: 'Error', text: err.message, confirmButtonColor: '#0891b2' });
            }
        };
        fetchOptions();
    }, []);

    // Filter models when series changes
    useEffect(() => {
        if (formData.seriesId) {
            const filtered = allModels.filter(m => m.seriesId === formData.seriesId);
            setFilteredModels(filtered);
        } else {
            setFilteredModels([]);
        }
    }, [formData.seriesId, allModels]);

    // Fetch listing data when in edit mode
    useEffect(() => {
        if (isEdit && listingId) {
            const fetchListing = async () => {
                setLoading(true);
                try {
                    const token = localStorage.getItem('token');
                    const res = await fetch(`${API_BASE_URL}/api/admin/products/${listingId}`, {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                    });
                    let payload = {};
                    try { payload = await res.json(); } catch { /* empty */ }
                    if (!res.ok || payload.success === false) throw new Error(payload.message || 'Failed to load listing');
                    
                    const listing = payload.data;
                    // Map API data to form structure
                    setFormData({
                        title: listing.title || '',
                        categoryId: listing.category?.id || '',
                        seriesId: listing.series?.id || '',
                        deviceModelId: listing.deviceModel?.id || '',
                        conditionId: listing.condition?.id || '',
                        basePrice: listing.basePrice || '',
                        stockQuantity: listing.stockQuantity || '',
                        colorIds: listing.availableColors?.map(c => c.id) || [],
                        storageOptionIds: listing.availableStorageOptions?.map(s => s.id) || [],
                        ramOptionIds: listing.availableRamOptions?.map(r => r.id) || [],
                        introduction: listing.introduction || '',
                        listingStatus: listing.listingStatus || 'ACTIVE',
                    });
                    if (listing.faqs?.length) setFaqs(listing.faqs);
                    if (listing.specifications?.length) setSpecifications(listing.specifications);
                    // TODO: handle images if API provides them
                } catch (err) {
                    await Swal.fire({ icon: 'error', title: 'Error', text: err.message, confirmButtonColor: '#0891b2' });
                } finally {
                    setLoading(false);
                }
            };
            fetchListing();
        }
    }, [isEdit, listingId]);

    const updateField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // For array fields, convert single value to array
        if (name === 'colorIds' || name === 'storageOptionIds' || name === 'ramOptionIds') {
            updateField(name, value ? [value] : []);
        } else {
            updateField(name, value);
        }
    };

    const handleFaqQuestionChange = (index, value) => {
        const updated = [...faqs];
        updated[index].question = value;
        setFaqs(updated);
    };

    const handleFaqAnswerChange = (index, value) => {
        const updated = [...faqs];
        updated[index].answer = value;
        setFaqs(updated);
    };

    const handleRemoveFaq = (index) => {
        setFaqs((prev) => prev.filter((_, i) => i !== index));
    };

    const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);

    const handleTechnicalSpecSpecificationChange = (index, value) => {
        const updated = [...specifications];
        updated[index].name = value;
        setSpecifications(updated);
    };

    const handleTechnicalSpecValueChange = (index, value) => {
        const updated = [...specifications];
        updated[index].value = value;
        setSpecifications(updated);
    };

    const handleRemoveTechnicalSpec = (index) => {
        setSpecifications((prev) => prev.filter((_, i) => i !== index));
    };

    const addTechnicalSpec = () => setSpecifications([...specifications, { name: '', value: '' }]);

    const handleImageAdd = (files) => {
        setSpecImages((prev) => [...prev, ...files]);
    };

    const handleImageRemove = (index) => {
        setSpecImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();
            
            // Append text fields
            formDataToSend.append('title', formData.title);
            formDataToSend.append('categoryId', formData.categoryId);
            formDataToSend.append('seriesId', formData.seriesId);
            formDataToSend.append('deviceModelId', formData.deviceModelId);
            formDataToSend.append('conditionId', formData.conditionId);
            formDataToSend.append('basePrice', formData.basePrice);
            formDataToSend.append('stockQuantity', formData.stockQuantity);
            formDataToSend.append('introduction', formData.introduction);
            formDataToSend.append('listingStatus', formData.listingStatus);
            
            // Append array fields as JSON strings
            formDataToSend.append('colorIds', JSON.stringify(formData.colorIds));
            formDataToSend.append('storageOptionIds', JSON.stringify(formData.storageOptionIds));
            formDataToSend.append('ramOptionIds', JSON.stringify(formData.ramOptionIds));
            formDataToSend.append('faqs', JSON.stringify(faqs));
            formDataToSend.append('specifications', JSON.stringify(specifications));
            formDataToSend.append('highlights', JSON.stringify([]));
            
            // Append images
            specImages.forEach((file) => {
                formDataToSend.append('images', file);
            });
            
            const url = isEdit 
                ? `${API_BASE_URL}/api/admin/products/${listingId}` 
                : `${API_BASE_URL}/api/admin/products`;
            const method = isEdit ? 'PATCH' : 'POST';
            
            const res = await fetch(url, {
                method,
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: formDataToSend,
            });
            
            let data = {};
            try { data = await res.json(); } catch { /* empty */ }
            if (!res.ok || data.success === false) throw new Error(data.message || `Failed to ${isEdit ? 'update' : 'create'} listing`);
            
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Listing ${isEdit ? 'updated' : 'created'} successfully.`,
                confirmButtonColor: '#0891b2',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/dashboard/admin/listing');
        } catch (err) {
            await Swal.fire({ icon: 'error', title: 'Error', text: err.message, confirmButtonColor: '#0891b2' });
        } finally {
            setLoading(false);
        }
    };


    if (loading && isEdit) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-sm text-gray-400">Loading listing...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="pb-3">
                <p className="text-xs text-gray-400 mb-2">Listing &gt; {isEdit ? 'Edit' : 'Create'} Listing</p>
                <Link to="/dashboard/admin/listing" className="text-sm text-teal-600 hover:text-teal-700 font-medium cursor-pointer">
                    ← Back
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="pb-10">
                <AdminDashboardTitle title={isEdit ? 'Edit Listing' : 'Add New Listing'} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <FormField label="Product Title">
                        <TextInput
                            name="title"
                            placeholder="E.g. iPhone 15 Pro Max"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </FormField>
                    <FormField label="Category">
                        <SelectInput
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Category' },
                                ...categories.map(c => ({ value: c.id, label: c.name }))
                            ]}
                        />
                    </FormField>
                    <FormField label="Series">
                        <SelectInput
                            name="seriesId"
                            value={formData.seriesId}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Series' },
                                ...allSeries.map(s => ({ value: s.id, label: s.name }))
                            ]}
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <FormField label="Model">
                        <SelectInput
                            name="deviceModelId"
                            value={formData.deviceModelId}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Model' },
                                ...filteredModels.map(m => ({ value: m.id, label: m.name }))
                            ]}
                            disabled={!formData.seriesId}
                        />
                    </FormField>
                    <FormField label="Condition">
                        <SelectInput
                            name="conditionId"
                            value={formData.conditionId}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Condition' },
                                ...conditions.map(c => ({ value: c.id, label: c.name }))
                            ]}
                        />
                    </FormField>
                    <FormField label="Price">
                        <NumberInput
                            name="basePrice"
                            placeholder="1200000"
                            value={formData.basePrice}
                            onChange={handleChange}
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField label="Color">
                        <SelectInput
                            name="colorIds"
                            value={formData.colorIds[0] || ''}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Color' },
                                ...colors.map(c => ({ value: c.id, label: c.name }))
                            ]}
                        />
                    </FormField>
                    <FormField label="Stock Quantity">
                        <NumberInput
                            name="stockQuantity"
                            placeholder="0"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                        />
                    </FormField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField label="Storage Options">
                        <SelectInput
                            name="storageOptionIds"
                            value={formData.storageOptionIds[0] || ''}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select Storage' },
                                ...storageOptions.map(s => ({ value: s.id, label: s.name }))
                            ]}
                        />
                    </FormField>
                    <FormField label="RAM Option">
                        <SelectInput
                            name="ramOptionIds"
                            value={formData.ramOptionIds[0] || ''}
                            onChange={handleChange}
                            options={[
                                { value: '', label: 'Select RAM' },
                                ...ramOptions.map(r => ({ value: r.id, label: r.name }))
                            ]}
                        />
                    </FormField>
                </div>

                <div className="mb-6">
                    <FormField label="Introduction">
                        <Textarea
                            name="introduction"
                            placeholder="Write something about the phone..."
                            value={formData.introduction}
                            onChange={handleChange}
                            rows={4}
                        />
                    </FormField>
                </div>

                <div className="mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-3">Frequently Asked Question</h2>
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            index={index}
                            faq={faq}
                            onQuestionChange={handleFaqQuestionChange}
                            onAnswerChange={handleFaqAnswerChange}
                            onRemove={handleRemoveFaq}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={addFaq}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium mt-1 cursor-pointer"
                    >
                        Add Another Question
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-3">Technical Specifications</h2>
                    {specifications.map((spec, index) => (
                        <TechnicalSpecItem
                            key={index}
                            index={index}
                            spec={spec}
                            onSpecificationChange={handleTechnicalSpecSpecificationChange}
                            onValueChange={handleTechnicalSpecValueChange}
                            onRemove={handleRemoveTechnicalSpec}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={addTechnicalSpec}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium mt-1 cursor-pointer"
                    >
                        Add Another Specification
                    </button>
                </div>

                <div className="mb-8">
                    <FormField label="Specification Images">
                        <ImageUpload images={specImages} onFilesAdded={handleImageAdd} onRemove={handleImageRemove} />
                    </FormField>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-custom text-white text-sm font-medium py-2 px-6 rounded-md transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Save'}
                </button>
            </form>
        </div>
    );
};

export default Addlisting;