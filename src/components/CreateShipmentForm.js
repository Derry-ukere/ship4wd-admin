/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Divider,
  Box,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Paper,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import CustomAlert from './Alert';
import { useDispatch, useSelector } from '../redux/store';
import { createShipmentFunc } from '../redux/slices/shipments/createshipment';
import { fetchShipmentFunc } from '../redux/slices/shipments/featchshipments';
import { v4 as uuidv4 } from 'uuid';

const SHIPMENT_TYPES = [
  { value: 'parcel', label: 'Parcel' },
  { value: 'document', label: 'Document' },
  { value: 'freight', label: 'Freight' },
  { value: 'pallet', label: 'Pallet' },
];

const SERVICE_LEVELS = [
  { value: 'standard', label: 'Standard (5-7 business days)' },
  { value: 'express', label: 'Express (2-3 business days)' },
  { value: 'overnight', label: 'Overnight (next business day)' },
  { value: 'economy', label: 'Economy (7-14 business days)' },
];

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
  'Australia', 'Japan', 'China', 'India', 'Brazil', 'Mexico',
  'Nigeria', 'South Africa', 'Ghana', 'Kenya', 'UAE',
  'Saudi Arabia', 'Singapore', 'Netherlands', 'Italy', 'Spain',
];

const PACKAGE_CATEGORIES = [
  'Electronics', 'Clothing & Textiles', 'Documents', 'Food & Perishables',
  'Furniture', 'Machinery & Equipment', 'Medical Supplies', 'Chemicals',
  'Jewelry & Valuables', 'Automotive Parts', 'Raw Materials', 'Other',
];

const initialFormState = {
  // Sender
  senderName: '',
  senderEmail: '',
  senderPhone: '',
  senderCompany: '',
  senderStreet: '',
  senderCity: '',
  senderState: '',
  senderZip: '',
  senderCountry: '',
  // Receiver
  receiverName: '',
  receiverEmail: '',
  receiverPhone: '',
  receiverCompany: '',
  receiverStreet: '',
  receiverCity: '',
  receiverState: '',
  receiverZip: '',
  receiverCountry: '',
  // Package
  shipmentType: 'parcel',
  weight: '',
  length: '',
  width: '',
  height: '',
  packageCount: '1',
  contents: '',
  contentCategory: '',
  declaredValue: '',
  // Service
  serviceLevel: 'standard',
  requiresInsurance: false,
  isFragile: false,
  requiresSignature: false,
  // Origin & Notes
  initialLocation: '',
  estimatedPickupDate: '',
  specialInstructions: '',
  description: '',
};

const SectionTitle = ({ children }) => (
  <Typography variant="h6" sx={{ mt: { xs: 2, sm: 3 }, mb: 1, fontWeight: 600, color: 'primary.main', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
    {children}
  </Typography>
);

const ShipmentForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error, success: createdshipment } = useSelector((state) => state.createshipment);
  const [form, setForm] = useState(initialFormState);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
  };

  const createShipment = (e) => {
    e.preventDefault();
    try {
      const myUuid = uuidv4();
      const cleanId = myUuid.replace(/[.#$\/\[\]]/g, '_');
      const uniqueId = generateUniqueId();

      const newShipmentData = {
        id: cleanId,
        trackingNumber: uniqueId,
        status: 'Pending Pickup',
        shipmentType: form.shipmentType,
        serviceLevel: form.serviceLevel,
        sender: {
          name: form.senderName,
          email: form.senderEmail,
          phone: form.senderPhone,
          company: form.senderCompany,
          address: {
            street: form.senderStreet,
            city: form.senderCity,
            state: form.senderState,
            zip: form.senderZip,
            country: form.senderCountry,
          },
        },
        receiver: {
          name: form.receiverName,
          email: form.receiverEmail,
          phone: form.receiverPhone,
          company: form.receiverCompany,
          address: {
            street: form.receiverStreet,
            city: form.receiverCity,
            state: form.receiverState,
            zip: form.receiverZip,
            country: form.receiverCountry,
          },
        },
        details: {
          weight: form.weight,
          dimensions: `${form.length}x${form.width}x${form.height} inches`,
          length: form.length,
          width: form.width,
          height: form.height,
          packageCount: form.packageCount,
          contents: form.contents,
          contentCategory: form.contentCategory,
          declaredValue: form.declaredValue,
        },
        options: {
          requiresInsurance: form.requiresInsurance,
          isFragile: form.isFragile,
          requiresSignature: form.requiresSignature,
        },
        estimatedPickupDate: form.estimatedPickupDate || null,
        specialInstructions: form.specialInstructions,
        locations: [
          {
            timestamp: new Date(),
            location: form.initialLocation,
            description: form.description || 'Shipment created — awaiting pickup',
          },
        ],
        // Keep legacy fields for backward compatibility with ShipmentCard
        senderName: form.senderName,
        receiverName: form.receiverName,
      };

      dispatch(createShipmentFunc(newShipmentData));
      setForm(initialFormState);
      dispatch(fetchShipmentFunc());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
      <form onSubmit={createShipment}>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Create New Shipment
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Fill in the shipment details below. All required fields are marked with *.
        </Typography>

        {/* ───── Shipment Type & Service ───── */}
        <SectionTitle>Shipment Type & Service</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select label="Shipment Type" fullWidth required
              value={form.shipmentType} onChange={handleChange('shipmentType')}
            >
              {SHIPMENT_TYPES.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select label="Service Level" fullWidth required
              value={form.serviceLevel} onChange={handleChange('serviceLevel')}
            >
              {SERVICE_LEVELS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>

        {/* ───── Sender Details ───── */}
        <SectionTitle>Sender Details</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name *" fullWidth required value={form.senderName} onChange={handleChange('senderName')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Company" fullWidth value={form.senderCompany} onChange={handleChange('senderCompany')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email *" type="email" fullWidth required value={form.senderEmail} onChange={handleChange('senderEmail')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone *" fullWidth required value={form.senderPhone} onChange={handleChange('senderPhone')} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Street Address *" fullWidth required value={form.senderStreet} onChange={handleChange('senderStreet')} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="City *" fullWidth required value={form.senderCity} onChange={handleChange('senderCity')} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="State / Province *" fullWidth required value={form.senderState} onChange={handleChange('senderState')} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Postal Code *" fullWidth required value={form.senderZip} onChange={handleChange('senderZip')} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select label="Country *" fullWidth required
              value={form.senderCountry} onChange={handleChange('senderCountry')}
            >
              {COUNTRIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>

        {/* ───── Receiver Details ───── */}
        <SectionTitle>Receiver Details</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name *" fullWidth required value={form.receiverName} onChange={handleChange('receiverName')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Company" fullWidth value={form.receiverCompany} onChange={handleChange('receiverCompany')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email *" type="email" fullWidth required value={form.receiverEmail} onChange={handleChange('receiverEmail')} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone *" fullWidth required value={form.receiverPhone} onChange={handleChange('receiverPhone')} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Street Address *" fullWidth required value={form.receiverStreet} onChange={handleChange('receiverStreet')} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="City *" fullWidth required value={form.receiverCity} onChange={handleChange('receiverCity')} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="State / Province *" fullWidth required value={form.receiverState} onChange={handleChange('receiverState')} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Postal Code *" fullWidth required value={form.receiverZip} onChange={handleChange('receiverZip')} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select label="Country *" fullWidth required
              value={form.receiverCountry} onChange={handleChange('receiverCountry')}
            >
              {COUNTRIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>
        </Grid>

        {/* ───── Package Details ───── */}
        <SectionTitle>Package Details</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Weight *" fullWidth required type="number"
              InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment>, inputProps: { min: 0, step: 0.1 } }}
              value={form.weight} onChange={handleChange('weight')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Number of Packages" fullWidth type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={form.packageCount} onChange={handleChange('packageCount')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Declared Value" fullWidth type="number"
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>, inputProps: { min: 0, step: 0.01 } }}
              value={form.declaredValue} onChange={handleChange('declaredValue')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Length *" fullWidth required type="number"
              InputProps={{ endAdornment: <InputAdornment position="end">in</InputAdornment>, inputProps: { min: 0, step: 0.1 } }}
              value={form.length} onChange={handleChange('length')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Width *" fullWidth required type="number"
              InputProps={{ endAdornment: <InputAdornment position="end">in</InputAdornment>, inputProps: { min: 0, step: 0.1 } }}
              value={form.width} onChange={handleChange('width')}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Height *" fullWidth required type="number"
              InputProps={{ endAdornment: <InputAdornment position="end">in</InputAdornment>, inputProps: { min: 0, step: 0.1 } }}
              value={form.height} onChange={handleChange('height')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select label="Content Category *" fullWidth required
              value={form.contentCategory} onChange={handleChange('contentCategory')}
            >
              {PACKAGE_CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contents Description *" fullWidth required
              value={form.contents} onChange={handleChange('contents')}
              placeholder="e.g. 2x laptop, 1x monitor"
            />
          </Grid>
        </Grid>

        {/* ───── Service Options ───── */}
        <SectionTitle>Service Options</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Checkbox checked={form.requiresInsurance} onChange={handleChange('requiresInsurance')} />}
              label="Shipment Insurance"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Checkbox checked={form.isFragile} onChange={handleChange('isFragile')} />}
              label="Fragile — Handle with Care"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={<Checkbox checked={form.requiresSignature} onChange={handleChange('requiresSignature')} />}
              label="Signature Required"
            />
          </Grid>
        </Grid>

        {/* ───── Origin & Scheduling ───── */}
        <SectionTitle>Origin & Scheduling</SectionTitle>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pickup / Origin Location *" fullWidth required
              value={form.initialLocation} onChange={handleChange('initialLocation')}
              placeholder="e.g. Lagos Warehouse, 123 Port Ave"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Estimated Pickup Date" fullWidth type="date"
              InputLabelProps={{ shrink: true }}
              value={form.estimatedPickupDate} onChange={handleChange('estimatedPickupDate')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Initial Status Description" fullWidth
              value={form.description} onChange={handleChange('description')}
              placeholder="e.g. Package received at origin warehouse"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Special Instructions" fullWidth multiline rows={3}
              value={form.specialInstructions} onChange={handleChange('specialInstructions')}
              placeholder="Any special handling requirements, delivery notes, etc."
            />
          </Grid>
        </Grid>

        {/* ───── Submit ───── */}
        <Box sx={{ mt: 3 }}>
          {createdshipment && (
            <CustomAlert
              severity="success"
              title="Shipment created successfully"
              message=""
            />
          )}
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 1, px: { xs: 3, sm: 5 }, width: { xs: '100%', sm: 'auto' } }}
          >
            Create Shipment
          </LoadingButton>
        </Box>
      </form>
    </Paper>
  );
};

export default ShipmentForm;
