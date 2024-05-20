import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useGridApiContext } from '@mui/x-data-grid';
import downloadExcel from '../helper/downloadExcel';

const CustomToolbar = () => {
    const apiRef = useGridApiContext();

    const handleDownload = () => {
        console.log(apiRef);
        const rows = apiRef.current.getAllRows();
        const columns = apiRef.current.getAllColumns();
        downloadExcel(rows, columns);
    };

    return (
        <GridToolbarContainer>
            <GridToolbarExport />
            <Button onClick={handleDownload}>Download as Excel</Button>
        </GridToolbarContainer>
    );
};

export default CustomToolbar
