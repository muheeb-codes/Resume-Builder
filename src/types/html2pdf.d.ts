declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number;
        filename?: string;
        image?: {
            type?: string;
            quality?: number;
        };
        html2canvas?: {
            scale?: number;
            useCORS?: boolean;
            backgroundColor?: string;
            allowTaint?: boolean;
            logging?: boolean;
            width?: number;
            height?: number;
        };
        jsPDF?: {
            unit?: string;
            format?: string;
            orientation?: string;
            compress?: boolean;
        };
    }

    interface Html2PdfInstance {
        set: (options: Html2PdfOptions) => Html2PdfInstance;
        from: (element: HTMLElement) => Html2PdfInstance;
        save: () => Promise<void>;
    }

    function html2pdf(): Html2PdfInstance;
    export default html2pdf;
} 